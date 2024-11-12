import express from "express";
import cors from "cors";
import path from "path";
import scheduleHouseScraping from "./services/housescraping.js"
import {db, getHouseInfoByDate,getHouseInfoByDateRange} from "./services/dbHandler.js"

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
    console.log(dateType);

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

    let house = await getHouseInfoByDateRange(prevDate);
    res.send(house);
});
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
