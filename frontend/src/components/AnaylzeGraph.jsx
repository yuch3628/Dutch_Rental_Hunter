import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';

function AnaylzeGraph(props) {
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
            <PieChart
                series={[
                    {
                        data: props.data
                    },
                ]}
                width='600'
                height='400'
            />
            <Box sx={{ p: 2 }}>
                <b>Apartments by Area</b>
            </Box>
        </Card>

    );

}
export default AnaylzeGraph;