import { BarChart } from "@mui/x-charts";
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { Box } from "@mui/material";
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import _ from 'lodash';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );  

export default function Chart({datasource}: any){
    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

    const labels = _.map(datasource, 'ano');
    let datasets:any = [];
    const {ano, ...exceptYear} = datasource[0];
    let newData = Object.keys(exceptYear)

    newData.map((itens:any, index:any) => {
        datasets.push({
            data: datasource.map((iten:any, inde:any) => {
                return iten[itens]
            }),
            label: itens
        })
    });

    const data = {
        labels,
        datasets: datasets,
      };
      

    return (
        <Box height={400}>
            <Bar options={options} data={data} />
        </Box>
    );
}