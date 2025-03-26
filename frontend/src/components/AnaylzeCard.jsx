import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';

function AnaylzeCard(props) {
    const addUnit = props.title === "Rental Market Shift" ? '(This vs. Last 30 Days)': '';
    return (
        <Card
            sx={{
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '225px',
                width: '100%'
            }}
        >
            <Box component="img" sx={{ width: 80, height: 80, ml: 2, mb: 3, alignContent: 'flex-start' }} src={props.img}>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ my: 1, typography: 'subtitle2' }}>{props.title}</Box>
                    <Box sx={{ typography: 'h4' }}>{props.count}</Box>
                    <Box sx={{ typography: 'body2' }}>{addUnit}</Box>
                </Box>
            </Box>
        </Card>
    );


}
export default AnaylzeCard;