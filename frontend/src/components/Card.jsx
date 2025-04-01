import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Carousel from 'react-material-ui-carousel';
import WebIcon from '@mui/icons-material/Web';
import IconButton from '@mui/material/IconButton';


const imgUrlComp = (data) => {

    if (data.imgurls.length === 0) {
        return (<div></div>);
    } else {
        return (
            <Carousel>
                {data.imgurls.map((url, index) =>
                    <CardMedia component="img"
                        id={index}
                        key={index}
                        sx={{
                            width: "100%", borderRadius: 10, flexGrow: "1"
                        }}
                        image={url}
                        lt="house picture" />)}
            </Carousel>);
    }

};



export default function OutlinedCard({ data }) {
    return (
        <CardContent sx={{
            bgcolor: 'white',
            border: '1',
            borderRadius: 15,
            px: { xs: 1, sm: 2, md: 4, lg: 4 },
            mx: { xs: 3, sm: 5, md: 8, lg: 15 },
            my: { xs: 1, sm: 2, md: 3, lg: 4 }
        }}>
            <Grid container spacing={1}>
                <Grid alignContent="center" size={{ xs: 12, md: 7 }} sx={{ p: 2 }}>
                    <Box display="flex"
                        sx={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                        <Typography component="div" variant="h4">
                            <b>{data.address}</b>
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'text.secondary', pt: 2 }}
                        >
                            {data.city} , {data.region}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            {data.postcode}
                        </Typography>
                        <Typography
                            variant="h7"
                            component="div"
                            sx={{ color: 'text.secondary', pt: 2 }}
                        >
                            {data.price} euro/month
                        </Typography>
                        <Typography
                            variant="h7"
                            component="div"
                            sx={{ color: 'text.secondary', pt: 2 }}
                        >
                            <IconButton aria-label="web" href={data.url} target="_blank">
                                <WebIcon />
                            </IconButton>
                        </Typography>


                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }} style={{ mx: "10%" }}>
                    {imgUrlComp(data)}
                </Grid>
            </Grid>
        </CardContent>
    );
}