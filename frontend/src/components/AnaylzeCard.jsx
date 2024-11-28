import { Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
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
                color: 'pink',
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                backgroundColor: 'blue'
            }}
                >
                <Box sx={{ width: 60, height: 60, mb: 3 }}>
                    <OtherHousesIcon color="secondary" />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box sx={{ flexGrow: 1, minWidth: 112 }}>
                        <Box sx={{ mb: 1, typography: 'subtitle2' }}>Recent Five Days Application</Box>
                        <Box sx={{ typography: 'h4' }}>5</Box>
                    </Box>
                </Box>
            </Card>
        );


}
export default AnaylzeCard;