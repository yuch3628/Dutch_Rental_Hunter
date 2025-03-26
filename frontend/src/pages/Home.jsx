import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Grid from '@mui/material/Grid2';
import AnaylzeCard from "../components/AnaylzeCard.jsx";
import AnaylzeGraph from "../components/AnaylzeGraph.jsx";
import WeekTinyChart from "../components/WeekTinyChart.jsx";
import MonthlyChart from "../components/MonthlyChart.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

const Home = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dashboardInfo = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/dashboard`)
            .then((res) => {
                setDashboardData(res.data);
                setLoading(false);
            }).catch((err) => {
                setError('Failed to load dashboard data');
                setLoading(false);
            }, []);
    }
    useEffect(() => {
        dashboardInfo();
    }, []);

    const dashboardComp = () => {
        if (loading) {
            return (
                <Box sx={{my: 3, px: 6}}><CircularProgress size="3em" /></Box>
            );
        }

        if (error) {
            return <div>{error}</div>;
        }

        let growth = dashboardData.TwoMonthComp;
        let monthCompImg = (growth[0] === "-") ? "./decrease.png" : "./increase.png";
        growth = (growth[0] !== "-") ? `+${growth}` : growth;
        return (
            <Grid container spacing={2} sx={{ flexBasis: '25%', alignItems: 'center', my: 3, px: 6 }} >
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard title="New ApartmentsToday" count={dashboardData.TodaysCount} img="./home.png" />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard title="Rental Market Shift" count={growth} img={monthCompImg} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AnaylzeCard title="Weekday Median Rent" img="./rent.png" count={dashboardData.WeekMedianRent} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                    <WeekTinyChart title="Weekday Trends (bar chart)" data={dashboardData.WeekTrendBar} />
                </Grid>
                <Grid item size={{ xs: 12, lg: 6 }}>
                    <AnaylzeGraph data={dashboardData.CircleGraph} />
                </Grid>
                <Grid item size={{ xs: 12, lg: 6 }}>
                    <MonthlyChart data={dashboardData.MonthLineChart} />
                </Grid>
            </Grid>);
    }
    return (
        <div>
            <NavBar></NavBar>
            {dashboardComp()}
            <hr />
        </div>

    );
};

export default Home;