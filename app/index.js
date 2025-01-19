import express from "express";
import cors from "cors";
import path from "path";
import scheduleHouseScraping from "./services/housescraping.js"
import {db, getHouseInfoByDate, getHouseCountByDate, getHouseCountByThis30Days, getHouseCountByPast30Days, getHouseMedianInAWeek} from "./services/dbHandler.js"
import {findMedian, amsPostCode, weekday, monthGrowth} from "./rule.js";

import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const app = express();
app.use(cors());

await scheduleHouseScraping();

app.get("/", (req,res) => { 
    res.send("successfully to connect!");
});

app.get("/house/today", async (req,res) => {
    let date = new Date();
    let house = await getHouseInfoByDate(date);
    res.send(house);
});

app.get("/house/yesterday", async (req,res) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let house = await getHouseInfoByDate(yesterday);
    res.send(house);
});

app.get("/house/date/:id", async (req,res) => {
    var dateType = req.params.id;

    const date = new Date();
    let prevDate = new Date(date);

    switch (dateType) {
        case '1':
            prevDate.setMonth(date.getMonth() - 6);
            break;
        case '2':
            prevDate.setMonth(date.getMonth() - 3);
            break;
        case '3':
            prevDate.setMonth(date.getMonth() - 2);
            break;
        case '4':
            prevDate.setMonth(date.getMonth() - 1);
            break;
        case '5':
            prevDate.setDate(date.getDate() - 20);
            break;
        case '6':
            prevDate.setDate(date.getDate() - 15);
            break;
        case '7':
            prevDate.setDate(date.getDate() - 10);
            break;
        case '8':
            prevDate.setDate(date.getDate() - 5);
            break;
        default:
            prevDate = date;
    }

    let house = await getHouseInfoByDate(prevDate);
    res.send(house);
});

app.get('/dashboard', async(req,res) => {
    const date = new Date();
    let prevDate = new Date(date);

    // today's house amount
    let todayHouseCount = await getHouseCountByDate(prevDate);
    // this 30 days vs last 30 days
    let this30Days = await getHouseCountByThis30Days();
    let past30Days = await getHouseCountByPast30Days();
    let growth = monthGrowth(this30Days,past30Days);
    
    //this week median rent
    let thisWeekRentList = await getHouseMedianInAWeek();
    let weekMedianRent = findMedian(thisWeekRentList);  
    
    //week trend bar
    let weekTrendBar = [];
    let weekTrendDate = new Date(date.getTime());
    let day = [];
    let houseWeekItem = [];
    for(let i = 0; i < 7; i++){
        weekTrendDate.setTime(date.getTime() - (24 * 3600 * 1000 * i));
        let houseWeekAmount = await getHouseCountByDate(weekTrendDate);
        day.push(weekday[weekTrendDate.getDay()]);
        houseWeekItem.push(parseInt(houseWeekAmount));
    }
    weekTrendBar.push({day:day});
    weekTrendBar.push({houseWeekItem:houseWeekItem});
    // circlegraph   
    const area = {
        central: 0,
        east: 0,
        north: 0,
        westpoort: 0,
        west: 0,
        newwest: 0,
        south: 0,
        southeast: 0,
        others:0 
    };

    prevDate.setMonth(date.getMonth() - 1);
    let house = await getHouseInfoByDate(prevDate);

    for (let info of house){
        let code = parseInt(info.postcode.split(' ')[0]);
        amsPostCode(area, code);
    }
    
    let circleGraph = [];
    let count = 0;
    for (let a in area){
        let item = {id:count, value:area[a], label:a};
        circleGraph.push(item);
        count++;
    }

    // month line chart
    let monthLineChart = [];
    let monthLineDate = new Date(date.getTime());
    for(let i = 30; i >= 0 ; i--){
        monthLineDate.setTime(date.getTime() - (24 * 3600 * 1000 * i));
        let houseMonthAmount = await getHouseCountByDate(monthLineDate);
        let houseMonthItems = { days: i, item: parseInt(houseMonthAmount)};
        monthLineChart.push(houseMonthItems);
    }

    let data = {
        TodaysCount : parseInt(todayHouseCount),
        WeekMedianRent : weekMedianRent + " €",
        TwoMonthComp : growth,
        WeekTrendBar : weekTrendBar,
        CircleGraph : circleGraph,
        MonthLineChart : monthLineChart
    };

    res.send(data);
});  


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
