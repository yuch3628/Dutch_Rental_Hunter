import express from "express";
import cors from "cors";
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

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

