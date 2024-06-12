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
  FormControlLabel
} from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import datasource1 from './datasource/datasource1.json';
import datasource2 from './datasource/datasource2.json';
import { ptBR } from '@mui/x-data-grid/locales';
import { useState } from "react";

function App() {
  const [ dataSource, setDatasource ] = useState(0);

  const datasources = [
    { "name": "datasource1.json", "title": "Fonte de dados 1" },
    { "name": "datasource2.json", "title": "Fonte de dados 2" },
    { "name": "datasource3.json", "title": "Fonte de dados 3" },
    { "name": "datasource4.json", "title": "Fonte de dados 4" },
    { "name": "datasource5.json", "title": "Fonte de dados 5" }
  ];

  const rows: GridRowsProp = datasource1;
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 15 },
    { field: 'nome', headerName: 'NOME', width: 150 },
    { field: 'categoria', headerName: 'CATEGORIA', width: 150 },
    { field: 'quantidade', headerName: 'PREÇO', width: 150 },
    { field: 'ano', headerName: 'ANO', width: 150 },
    { field: 'mes', headerName: 'MÊS', width: 150 },
    { field: 'cor', headerName: 'COR', width: 150 },
    { field: 'fabricante', headerName: 'FABRICANTE', width: 150 }
  ];

  const handleChange = (event: any) => {
    console.log(event.target.value)
  }

  return (
    <Stack direction="column" spacing={2} justifyContent={"center"}>
      <AppBar position="static">
        <Toolbar>
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
                  <Select fullWidth label="Teste" size="small">
                    <MenuItem>Teste</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select fullWidth label="Teste" size="small">
                    <MenuItem>Teste</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select fullWidth label="Teste" size="small">
                    <MenuItem>Teste</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <RadioGroup row>
                <FormControlLabel value="table" control={<Radio />} label="Tabela" />
                <FormControlLabel value="graph" control={<Radio />} label="Gráfico" />
              </RadioGroup>
            </Paper>

            <Paper sx={{padding: 1}} elevation={2} >
              <DataGrid 
                rows={rows}
                columns={columns}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                pagination
              />
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
