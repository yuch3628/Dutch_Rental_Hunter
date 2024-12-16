import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Grid from '@mui/material/Grid2';
import AnaylzeCard from "../components/AnaylzeCard.jsx";
import AnaylzeGraph from "../components/AnaylzeGraph.jsx";


const Home = () => {
    const [dashboardData, setDashboardData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    const dashboardInfo = () => {
        // setIsLoading(true);
        axios.get('http://localhost:8800/dashboard')
        .then((res) => {
            setDashboardData(res.data);
            console.log(res.data);
        });
    }
    useEffect(() => {
        dashboardInfo();
    },[]);

    const dashboardComp = () => {
        if (dashboardData.length !== 0) {
            return (
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
                        <AnaylzeGraph data={dashboardData} />
                    </Grid>
                    <Grid item size={{ xs: 12, lg: 6 }}>
                        <AnaylzeGraph data={dashboardData} />
                    </Grid>
                </Grid>);
        } else {
            return (
                <div></div>);
        }
    };

    const cardContextList = ['Recent 5 days application', 'Average application Per day from past month'];
    return (
        <div>
            <NavBar></NavBar>
            {dashboardComp()}
            <hr />
        </div>

    );
};

export default Home;