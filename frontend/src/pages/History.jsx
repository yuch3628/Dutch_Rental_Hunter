import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";
import ComboBox from "../components/ComboBox.jsx";
import Pagination from '@mui/material/Pagination';
import { Box } from "@mui/material";

const History = () => {
    const [houseData, setHouseData] = useState([]);
    let [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const cardPerPage = 5;
    const count = Math.ceil(houseData.length / cardPerPage);
    let firstIndex = cardPerPage * (page - 1);
    let secondIndex = firstIndex + cardPerPage > (houseData.length - 1) ? houseData.length : firstIndex + cardPerPage;

    const houseInfo = (id) => {
        if (id != null) {
            axios.get(`http://localhost:8800/house/date/${id}`).then((res) => {
                setHouseData(res.data);
            });
        }
    }
    useEffect(() => {
        houseInfo();
    },[]);


    return (
        <div>
            <NavBar></NavBar>
            <ComboBox getLabelId={(value) => houseInfo(value.id)} />
            {houseData?.slice(firstIndex, secondIndex).map(data =>
                <Card data={data} key={data.id}></Card>)}
            <Box sx={{ m: { xs: 3, sm: 5, md: 5, lg: 5 },
                    display:"flex",justifyContent:"center"
                }}>
                <Pagination count={count} page={page} variant="outlined"
                    onChange={handleChange} />
            </Box>

        </div>
    );
};

export default History;