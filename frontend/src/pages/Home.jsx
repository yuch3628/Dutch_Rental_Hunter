import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CollectionsIcon from '@mui/icons-material/Collections';
import AnaylzeCard from "../components/AnaylzeCard.jsx";



const Home = () => {
    const apiCall = () => {
        axios.get('http://localhost:8800/').then((res) => {
            console.log(res);
        })
    }
    useEffect(() => {
        // Update the document title using the browser API
        apiCall();
    });

    return (
        <div>
            <NavBar></NavBar>
            <Grid container spacing={2} sx={{ flexBasis: '25%', alignItems: 'center', my:3, px:6}} >
                <Grid item size={{ xs:12, md:4, xl:3}}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs:12, md:4, xl:3}}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs:12, md:4, xl:3}}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs:12, md:4, xl:3}}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs:12, md:4, xl:3}}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs:12, md:4, xl:3}}>
                    <AnaylzeCard />
                </Grid>
            </Grid>
            <hr/>
        </div>

    );
};

export default Home;