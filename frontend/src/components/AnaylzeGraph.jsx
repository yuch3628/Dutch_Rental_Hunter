import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';

function AnaylzeGraph(props) { 
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
            <PieChart
                series={[
                    {
                        data: props.data
                    },
                ]}
                width='600'
                height='400'
            />
        </Card>

    );

}
export default AnaylzeGraph;