import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function OutlinedCard({data}) {
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ width:1 }}>
        <Card variant="contained" >
            <CardContent sx={{
                bgcolor: '#F4E9C9',
                boxShadow: 1,
                borderRadius: 15,
                px: {xs:1, sm:2, md:4, lg:4},
                mx: {xs:3, sm:5, md:8, lg:15},
                my: {xs:1, sm:2, md:3, lg:4} }}>
                <Grid container spacing={1}>
                    <Grid alignContent="center" size ={{xs:12, md:7}} sx={{p:2}}>
                        <Box display="flex" 
                            sx={{flexDirection: 'column', flexWrap: 'wrap' }}>
                            <Typography component="div" variant="h4">
                            <b>{data.address}</b>
                            </Typography>
                            <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'text.secondary' , pt:2}}
                            >
                            {data.city} , {data.region}
                            </Typography>
                            <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'text.secondary'}}
                            >
                            {data.postcode}
                            </Typography>
                            <Typography
                            variant="h7"
                            component="div"
                            sx={{ color: 'text.secondary' , pt:2 }}
                            >
                            {data.price} euro/month
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size ={{xs:12, md:5}} style={{ mx:"10%" }}>
                        <CardMedia
                            component="img"
                            sx={{width: '100%', borderRadius: 10, flexGrow: "1"}}
                            image="https://cloud.funda.nl/valentina_media/199/417/230_1440x960.jpg"
                            a
                            lt="house picture"/>
                    </Grid>
                </Grid>
            </CardContent>
            
            </Card>
        </Box>
    </ThemeProvider>
  );
}