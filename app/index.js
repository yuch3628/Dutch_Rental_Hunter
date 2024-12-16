import express from "express";
import cors from "cors";
import path from "path";
import scheduleHouseScraping from "./services/housescraping.js"
import {db, getHouseInfoByDate} from "./services/dbHandler.js"

import dotenv from "dotenv";
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
            prevDate.setDate(prevDate.getDate() - 20);
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
    prevDate.setMonth(date.getMonth() - 1);
    let house = await getHouseInfoByDate(prevDate);

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

    for (let info of house){
        let code = parseInt(info.postcode.split(' ')[0]);
        switch (true) {
            case (code < 1019):
                area.central +=1;
                break;
            case (code <= 1019):
                area.east +=1;
                break;
            case (code >= 1020 && code < 1040):
                area.north +=1;
                break;
            case (code >= 1040 && code < 1050):
                area.westpoort +=1;
                break;
            case (code >= 1050 && code < 1060):
                area.west +=1;
                break;
            case (code >= 1060 && code < 1070):
                area.newwest +=1;
                break;
            case (code >= 1070 && code < 1084):
                area.south +=1;
                break;
            case (code >= 1086 && code < 1100):
                area.east +=1;
                break;
            case (code >= 1100 && code < 1110):
                area.southeast +=1;
                break;
            default:
                area.others +=1;
                break;
        }
    }

    let data = [];
    let count = 0;
    for (let a in area){
        let item = {id:count, value:area[a], label:a};
        data.push(item);
        count++;
    }

    res.send(data);
});  


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
