import express from "express";
import cors from "cors";
import scheduleHouseScraping from "./services/housescraping.js"
import {db, getHouseInfoByDate, getHouseCountByDate, getHouseCountByThis30Days, getHouseCountByPast30Days, getHouseMedianInAWeek} from "./services/dbHandler.js"
import {findMedian, amsPostCode, weekday, monthGrowth} from "./rule.js";
import { DateTime } from 'luxon';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

await scheduleHouseScraping();

app.get("/", (req,res) => { 
    res.send("successfully to connect!");
});

app.get("/house/today", async (req,res) => {
    const date = DateTime.now().setZone('Europe/Amsterdam').toISO().split('T')[0];

    let house = await getHouseInfoByDate(date);
    res.send(house);
});

app.get("/house/yesterday", async (req,res) => {
    const yesterday = DateTime.now().setZone('Europe/Amsterdam').minus({ days: 1 }).toISO().split('T')[0];

    let house = await getHouseInfoByDate(yesterday);
    res.send(house);
});

app.get("/house/date/:id", async (req,res) => {
    var dateType = req.params.id;
    const date = DateTime.now().setZone('Europe/Amsterdam');
    let prevDate = date;

    switch (dateType) {
        case '1':
            prevDate = prevDate.minus({ months: 6 });
            break;
        case '2':
            prevDate = prevDate.minus({ months: 3 });
            break;
        case '3':
            prevDate = prevDate.minus({ months: 2 });
            break;
        case '4':
            prevDate = prevDate.minus({ months: 1 });
            break;
        case '5':
            prevDate = prevDate.minus({ days: 20});
            break;
        case '6':
            prevDate = prevDate.minus({ days: 15 });
            break;
        case '7':
            prevDate = prevDate.minus({ days: 10 });
            break;
        case '8':
            prevDate = prevDate.minus({ days: 5 });
            break;
        default:
            console.warn('Invalid dateType:', dateType);
    }    
    prevDate = prevDate.toISO().split('T')[0];
    let house = await getHouseInfoByDate(prevDate);
    res.send(house);
});

app.get('/dashboard', async(req,res) => {
    // const date = new Date();
    const date = DateTime.now().setZone('Europe/Amsterdam');
    let prevDate = date.toISO().split('T')[0];

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
    let weekTrendDate;

    let day = [];
    let houseWeekItem = [];
    for(let i = 1; i < 8; i++){
        weekTrendDate = date.minus({days: `${i}`});
        let weekdayNum = weekTrendDate.weekday;
        
        weekTrendDate = weekTrendDate.toISO().split('T')[0];
        let houseWeekAmount = await getHouseCountByDate(weekTrendDate);
        
        day.push(weekday[weekdayNum-1]);
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
    let lastMonth = date.minus({month:1}).toISO().split('T')[0];

    let house = await getHouseInfoByDate(lastMonth);

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
    const monthLineDate = date;

    for(let i = 30; i >= 0 ; i--){

        let newMonthLineDate = monthLineDate.minus({day:`${i}`}).toISO().split('T')[0];
        let houseMonthAmount = await getHouseCountByDate(newMonthLineDate);
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
