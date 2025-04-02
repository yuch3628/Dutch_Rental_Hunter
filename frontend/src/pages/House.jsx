import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";
import Pagination from '@mui/material/Pagination';
import { Box } from "@mui/material";

const House = () => {
    const [houseData, setHouseData] = useState([]);
    let [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8801";
    const cardPerPage = 5;
    const count = Math.ceil(houseData.length / cardPerPage);
    let hasPagination = true;
    if (count === 1) {
        hasPagination = false;
    }
    let firstIndex = cardPerPage * (page - 1);
    let secondIndex = firstIndex + cardPerPage > (houseData.length - 1) ? houseData.length : firstIndex + cardPerPage;

    const houseInfo = () => {
        axios.get(`${API_URL}/house/today`).then((res) => {
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
    }, [houseInfo]);

    const houseComp = () => {
        if (houseData.length !== 0) {
            return (
                <Box>
                    {houseData.slice(firstIndex, secondIndex).map(data =>
                        <Card data={data} key={data.id}></Card>)}
                    {hasPagination && <Box sx={{
                        m: { xs: 3, sm: 5, md: 5, lg: 5 },
                        display: "flex", justifyContent: "center"
                    }}>
                        <Pagination count={count} page={page} variant="outlined" onChange={handleChange} /></Box>
                    }
                </Box>);
        } else {
            return (<div style={noInfoStyle}><h1 style={{ margin: '0px', color: '#a7a8aa' }}>House is not avilable today!</h1></div>);
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