import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";

const House = () => {
    const [houseData, setHouseData] = useState([]);

    const houseInfo = () => {
        axios.get('http://localhost:8800/house/today').then((res) => {
          setHouseData(res.data);
        })
    }

    const noInfoStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    }
    
    useEffect(() => {
        houseInfo();
    });
    
    const houseComp = () => {
        if (houseData.length) {
            return (houseData.map(data =>
                <Card data={data}></Card>));
        } else {
            return (<div style={noInfoStyle}><h1 style={{margin: '0px', color:'#a7a8aa'}}>House is not avilable today!</h1></div>);
        }
    };
        

    return (
        <div>
            <NavBar></NavBar>
            {houseComp()}
    
        </div>
    );
}

export default House;