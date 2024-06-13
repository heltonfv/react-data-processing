import { BarChart } from "@mui/x-charts";
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { Box } from "@mui/material";
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';

export default function Chart(){
    return (
        <Box height={400}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            />
        </Box>
    );
}