import { BarChart } from "@mui/x-charts";
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { Box } from "@mui/material";
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import _ from 'lodash';

export default function Chart({datasource}: any){
    const group = _.map(datasource, 'visualizacao')
    const data = _.map(datasource, 'soma')

    console.log(group)
    return (
        <Box height={400}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: group }]}
                series={[{data}]}
            />
        </Box>
    );
}