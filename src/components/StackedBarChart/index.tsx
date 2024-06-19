import { Box } from "@mui/material";
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
import { randomColor } from "../../utils/randomColor";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );  

export default function StackedBarChart({datasource}: any){
    const options = {
        plugins: {
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
        maintainAspectRatio : false
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
            label: itens,
            backgroundColor: randomColor()
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