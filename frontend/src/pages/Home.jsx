import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import Grid from '@mui/material/Grid2';
import AnaylzeCard from "../components/AnaylzeCard.jsx";
import AnaylzeGraph from "../components/AnaylzeGraph.jsx";
import WeekTinyChart from "../components/WeekTinyChart.jsx";
import MonthlyChart from "../components/MonthlyChart.jsx";


const Home = () => {
    const [dashboardData, setDashboardData] = useState([]);

    const dashboardInfo = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/dashboard`)
            .then((res) => {
                setDashboardData(res.data);
            });
    }
    useEffect(() => {
        dashboardInfo();
    }, []);

    const dashboardComp = () => {
        if (dashboardData.length !== 0) {
            let growth = dashboardData.TwoMonthComp;
            let monthCompImg = (growth[0] === "-") ? "./decrease.png" : "./increase.png";
            growth = (growth[0] === "-") ? growth.substring(1) : growth;
            return (
                <Grid container spacing={2} sx={{ flexBasis: '25%', alignItems: 'center', my: 3, px: 6 }} >
                    <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                        <AnaylzeCard title="New ApartmentsToday" count={dashboardData.TodaysCount} img="./home.png" />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
                        <AnaylzeCard title="This 30 days vs. Past 30 days" count={growth} img={monthCompImg} />
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