import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';

function AnaylzeGraph() {
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
                        data: [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                        ],
                    },
                ]}
                width='600'
                height='400'
            />
        </Card>

    );

}
export default AnaylzeGraph;