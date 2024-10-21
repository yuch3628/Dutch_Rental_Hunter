import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scheduleHouseScraping from "./services/housescraping.js"
dotenv.config();

const app = express();
app.use(cors());

await scheduleHouseScraping();


app.get("/", (req,res) => { 
    res.send("successfully to connect!");
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})