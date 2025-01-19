import * as React from 'react';
import Card from '@mui/material/Card';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';

function WeekTinyChart(props) {
    var houseWeekItem = props.data[1].houseWeekItem;
    var day = props.data[0].day;
    return (
        <Card
            sx={{
                p: 2,
                boxShadow: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '225px',
                width: '100%'
            }}
        >
            <ResponsiveChartContainer
                series={[
                    {
                        type: 'bar',
                        data: houseWeekItem,
                    }
                ]}
                xAxis={[
                    {
                        data: day,
                        scaleType: 'band',
                        id: 'x-axis-id',
                    },
                ]}
            >
                <BarPlot />
                <ChartsXAxis label="Weekday Trends" position="bottom" axisId="x-axis-id" />
            </ResponsiveChartContainer>
        </Card>
    );


}
export default WeekTinyChart;