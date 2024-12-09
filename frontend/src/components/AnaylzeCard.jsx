import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


function AnaylzeCard() {
    const newhouse = 5;

    return (
        <Card
            sx={{
                color: 'gray',
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                backgroundColor: 'lightgray',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box component="img" sx={{ width: 80, height: 80, ml:2 , mb: 3, alignContent: 'flex-start' }} src="./home.png">
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
                    <Box sx={{ my: 1, typography: 'subtitle2' }}>Recent 5 days application</Box>
                    <Box sx={{ typography: 'h4' }}>5</Box>
                </Box>
            </Box>
        </Card>
    );


}
export default AnaylzeCard;