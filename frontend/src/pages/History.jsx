import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";
import ComboBox from "../components/ComboBox.jsx";

const History = () => {
    const [houseData, setHouseData] = useState([]);

    const houseInfo = (id) => {
        if (id != null) {
            axios.get(`http://localhost:8800/house/date/${id}`).then((res) => {
                setHouseData(res.data);
            });
        }
    }
    useEffect(() => {
        houseInfo();
    });

    return (
        <div>
            <NavBar></NavBar>
            <ComboBox getLabelId={(value) => houseInfo(value.id)}/>
            {houseData.map(data =>
                <Card data={data}></Card>
            )}
        </div>
    );
};

export default History;