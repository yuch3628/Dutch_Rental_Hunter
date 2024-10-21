import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req,res) => { 
    res.send("successfully to connect!");
}

);
app.listen(8800, ()=>{
    console.log("Server running on port 8800")
})