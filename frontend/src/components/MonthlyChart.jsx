import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';

function MonthlyChart(props) {
    let day = [];
    let item = [];
    props.data.map((dayItem) => {
        day.push(dayItem.days);
        item.push(dayItem.item);
    })

    return (
        <Card
            sx={{
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '500px',
                width: '100%'
            }}
        >
            <LineChart
                xAxis={[{ data: day }]}
                series={[
                    {
                        data: item,
                        area: true,
                        baseline: 'min',
                    },
                ]}
            />
            <Box sx={{ p: 2 }}>
                <b>This month area distribution</b>
            </Box>
        </Card>
    );
}

export default MonthlyChart;
