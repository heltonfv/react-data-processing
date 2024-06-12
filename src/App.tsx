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
import { useState } from "react";
import DynamicTable from './components/DynamicTable';
import datasource1 from './datasource/datasource1.json';

function App() {
  const datasources = [
    { name: "datasource1.json", "title": "Fonte de dados 1" },
    { name: "datasource2.json", "title": "Fonte de dados 2" },
    { name: "datasource3.json", "title": "Fonte de dados 3" },
    { name: "datasource4.json", "title": "Fonte de dados 4" },
    { name: "datasource5.json", "title": "Fonte de dados 5" }
  ];

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
              <DynamicTable datasource={datasource1} />
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
