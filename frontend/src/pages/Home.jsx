import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CollectionsIcon from '@mui/icons-material/Collections';
import AnaylzeCard from "../components/AnaylzeCard.jsx";
import AnaylzeGraph from "../components/AnaylzeGraph.jsx";


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

    const cardContextList = ['Recent 5 days application', 'Average application Per day from past month'];
    return (
        <div>
            <NavBar></NavBar>
            <Grid container spacing={2} sx={{ flexBasis: '25%', alignItems: 'center', my: 3, px: 6 }} >
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard title="Recent 5 days application" />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard />
                </Grid>
                <Grid item size={{ xs: 12, lg: 6 }}>
                    <AnaylzeGraph />
                </Grid>
                <Grid item size={{ xs: 12, lg: 6 }}>
                    <AnaylzeGraph />
                </Grid>
            </Grid>
            <hr />
        </div>

    );
};

export default Home;