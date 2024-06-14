import { BarChart } from "@mui/x-charts";
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { Box } from "@mui/material";
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';

export default function Chart({datasource}: any){
    const pluck = (arr:any, key:any) => arr.map(i => i[key]);

    // const data = ['group A', 'group B', 'group C'];
    const data = pluck(datasource, 'nome')
    const series = [
        { data: pluck(datasource, 'id') },
    ];

    console.log(pluck(datasource, 'nome'));

    return (
        <Box height={400}>
            <BarChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: data
                    }]}
                series={series}
            />
        </Box>
    );
}