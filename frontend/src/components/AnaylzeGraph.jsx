import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

function AnaylzeGraph(piechartData) { 
    return (
        <Card
            sx={{
                color: 'white',
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                backgroundColor: 'lightgray',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* {loading?
                (<Skeleton variant="circular">
                    <Avatar />
                </Skeleton>)
            :(<PieChart
                series={[
                    {
                        data: piechartData
                    },
                ]}
                width='600'
                height='400'
            />)} */}
            <PieChart
                series={[
                    {
                        data: piechartData
                    },
                ]}
                width='600'
                height='400'
            />
        </Card>

    );

}
export default AnaylzeGraph;