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
  const [ sumFields, setSumFields ] = useState<string[]>();
  const [ detailFields, setDetailFields ] = useState<string[]>();
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
      setSumFields(fields);
      setDetailFields(fields);
    };
    fetchData();
  }, [selected]);

  return (
    <Stack direction="column" spacing={2} justifyContent={"center"}>
      <AppBar position="static">
        <Toolbar>
          <Typography><h3>LacLaw Project</h3></Typography>
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
                  <Select fullWidth label="Teste" size="small">
                    {sumFields?.map((item, index) => (
                      <MenuItem value={index}>{item.toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select fullWidth label="Teste" size="small">
                    {detailFields?.map((item, index) => (
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
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
