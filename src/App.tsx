import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Box,
  AppBar,
  Toolbar,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Typography,
  Paper,
  Grid,
  Menu,
  Radio,
  RadioGroup,
  FormControlLabel,
  SelectChangeEvent
} from '@mui/material';
import { useState, useEffect } from "react";
import DynamicTable from './components/DynamicTable';
import { FaD, FaDatabase } from "react-icons/fa6";
import Chart from './components/Chart';

function App() {
  const datasources = [
    { name: "datasource1.json", title: "Fonte de dados 1" },
    { name: "datasource2.json", title: "Fonte de dados 2" },
    { name: "datasource3.json", title: "Fonte de dados 3" },
    { name: "datasource4.json", title: "Fonte de dados 4" },
    { name: "datasource5.json", title: "Fonte de dados 5" }
  ];
  
  const [ selected, setSelected ] = useState('datasource1.json');
  const [ data, setData ] = useState([{id: 0}]);

  const [ sumField, setSumField ] = useState<string[]>();
  const [ selectedSumField, setSelectedSumField ] = useState<string[]>();

  const [ detailField, setDetailField ] = useState<string[]>();
  const [ selectedDetailField, setSelectedDetailField ] = useState<string[]>();

  const [ type, setType ] = useState("table");

  const handleDatasourceChange = (event:SelectChangeEvent) => {
    setSelected(event.target.value);
  }

  const handleTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`datasource/${selected}`);
      const result = await response.json();
      const fields = Object.keys(result[0]);

      setData(result);
      setSumField(fields);
      setDetailField(fields);
    };
    fetchData();
  }, [selected]);

  return (
    <Stack direction="column" spacing={2} justifyContent={"center"}>
      <AppBar position="static">
        <Toolbar>
          <FaDatabase size={25} />
          <Typography variant="h6" mt={1}>LacLaw Project</Typography>
        </Toolbar>
      </AppBar>
      <Grid 
        container 
        justifyContent={"center"}
        alignItems={"center"}
        >
        <Grid item xs={11} md={6}>
          <Stack spacing={2}>
            <Paper sx={{padding: 1}} elevation={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Select onChange={handleDatasourceChange} value={selected} fullWidth label="Teste" size="small">
                    {datasources.map((item) => (
                      <MenuItem value={item.name}>{item.title}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select value={selectedSumField} fullWidth label="Teste" size="small">
                    {sumField?.map((item, index) => (
                      <MenuItem value={index}>{item.toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select value={selectedDetailField} fullWidth label="Teste" size="small">
                    {detailField?.map((item, index) => (
                      <MenuItem value={index}>{item.toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <RadioGroup row value={type} onChange={handleTypeChange}>
                <FormControlLabel value="table" control={<Radio />} label="Tabela" />
                <FormControlLabel value="graph" control={<Radio />} label="Gráfico" />
              </RadioGroup>
            </Paper>

            <Paper sx={{padding: 1}} elevation={2} >
              {type === 'table' && <DynamicTable datasource={data} />}
              {type === 'graph' && <Chart/>}
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
