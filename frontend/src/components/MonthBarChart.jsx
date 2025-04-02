import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';


const chartSetting = {
  yAxis: [
    {
      label: 'Number of Apartments',
    },
  ],
  series: [{ dataKey: 'listed', label: 'Apartments Listed' }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

function MonthBarChart(props) {

  return (
    <Card
        sx={{
            p: 3,
            boxShadow: 'none',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '500px',
            width: '100%'}}>
        <BarChart
        dataset={props.data}
        xAxis={[
          { scaleType: 'band', dataKey: 'month',
            label: 'Month'},
        ]}
        {...chartSetting}
        />
        <Box sx={{ p: 2 }}>
            <b>Monthly Rental Trends (Last 6 Months)</b>
        </Box>
    </Card>
  );
}

export default MonthBarChart;