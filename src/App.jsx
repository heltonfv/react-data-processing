import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  AppBar,
  Toolbar,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@mui/material';
import { useState, useEffect } from "react";
import DynamicTable from './components/DynamicTable';
import { FaDatabase } from "react-icons/fa6";
import StackedBarChart from './components/StackedBarChart';
import BarChart from './components/BarChart';
import _ from 'lodash';
import { useFetch } from "./hooks/useFetch";

function App() {
  const datasources = [
    { name: "datasource1.json", title: "Produtos" },
    { name: "datasource2.json", title: "Clientes" },
    { name: "datasource3.json", title: "Funcionários" },
    { name: "datasource4.json", title: "Projetos" },
    { name: "datasource5.json", title: "Movimentações" }
  ];

  const [ selected, setSelected ] = useState('datasource1.json');
  const [ data, setData ] = useState([{id: 0}]);
  const [ filteredData, setFilteredData ] = useState([{}]);

  const [ sumField, setSumField ] = useState();
  const [ selectedSumField, setSelectedSumField ] = useState('');

  const [ viewByField, setViewByField ] = useState();
  const [ selectedViewByField, setSelectedViewByField ] = useState('');
  const [ disabledViewByField, setDisabledViewByField ] = useState(true);

  const [ detailField, setDetailField ] = useState();
  const [ selectedDetailField, setSelectedDetailField ] = useState('');
  const [ disabledDetailField, setDisabledDetailField ] = useState(true);

  const [ type, setType ] = useState("table");
  const [ dimension, setDimension ] = useState(false);

  const { fetchedData, isLoading, error } = useFetch(`/${selected}`);

  const handleDatasourceFieldChange = (event) => {
    setSelected(event.target.value);
    setSelectedSumField('');
    setSelectedViewByField('');
    setSelectedDetailField('');
    setDisabledViewByField(true);
    setDisabledDetailField(true);
  }

  const handleSumFieldChange = (event) => {
    setSelectedSumField(event.target.value);
    setDisabledViewByField(false);
  }

  const handleViewByFieldChange = (event) => {
    setSelectedViewByField(event.target.value);

    const groups = _.groupBy(data, event.target.value);

    const sumByGroup = _.map(groups, (itens, index) => {
      return {
        visualizacao: index,
        soma: _.sumBy(itens, selectedSumField)
      };
    });

    setFilteredData(sumByGroup);
    setDisabledDetailField(false);
  }

  const handleDetailFieldChange = (event) => {
    setSelectedDetailField(event.target.value);

    const year = _.groupBy(data, event.target.value);

    const category = _.map(year, (itens, index) => {
      const grouped = _.groupBy(itens, selectedViewByField);
        return {
          [index]: _.map(grouped, (iten, i) => {
          return {
            [i]: _.sumBy(iten, selectedSumField)
          }
        })
      }      
    });

    let columns = [];
    let rows = [];

    //get all rows
    _.map(category, (itens, index) => {
      rows.push(Object.keys(itens)[0])
    })

    //get all columns
    const findLeaves = (category) => {
      if (_.isObject(category)) {
        _.forEach(category, (value, key) => {
          if (_.isObject(value)) {
            findLeaves(value);
          } else {
            columns.push(key);
          }
        });
      }
    };

    findLeaves(category);

    const newJson = [];

    _.map(rows, (itens, index) => {
      let newObj = {ano: itens }
      _.map(columns, (iten, inde) => {
        newObj[iten] = null;
        _.map(columns, (ite, ind) => {
          if(category[index]?.[itens]?.[ind]?.[iten]){
            newObj[iten] = category[index]?.[itens]?.[ind]?.[iten];
          }
        });
      });
      newJson.push(newObj)
    });
    
    setDimension(true);
    setFilteredData(newJson);
  }


  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const clearAllFields = () => {
    setSelectedSumField('');
    setSelectedViewByField('');
    setSelectedDetailField('');
    setDisabledViewByField(true);
    setDisabledDetailField(true);
    setType('table');
    setFilteredData(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`datasource/${selected}`);
      const result = await response.json();
      const fields = Object.keys(result[0]);

      setData(result);
      setFilteredData(result);
      setSumField(fields);
      setViewByField(fields);
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
        <Grid item xs={11} md={8}>
          <Stack spacing={2}>
            <Paper sx={{padding: 1}} elevation={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Fonte de dados</InputLabel>
                    <Select onChange={handleDatasourceFieldChange} value={selected} fullWidth label="Fonte de dados" size="small">
                      {datasources.map((item) => (
                        <MenuItem value={item.name}>{item.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Somar</InputLabel>
                    <Select onChange={handleSumFieldChange} value={selectedSumField} fullWidth label="Somar" size="small">
                      {sumField?.map((item) => (
                        <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Visualizar por</InputLabel>
                    <Select disabled={disabledViewByField} onChange={handleViewByFieldChange} value={selectedViewByField} fullWidth label="Visualizar por" size="small">
                      {viewByField?.map((item) => (
                        <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Detalhar por</InputLabel>
                    <Select disabled={disabledDetailField} onChange={handleDetailFieldChange} value={selectedDetailField} fullWidth label="Detalhar por" size="small">
                      {detailField?.map((item) => (
                        <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} md={6}>
                  <RadioGroup row value={type} onChange={handleTypeChange}>
                    <FormControlLabel disabled={disabledDetailField} value="table" control={<Radio />} label="Tabela" />
                    <FormControlLabel disabled={disabledDetailField} value="graph" control={<Radio />} label="Gráfico" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: {xs: 'start', md: 'end'} }}>
                  <Button size="small" variant="contained" onClick={clearAllFields}>
                    Limpar
                  </Button>
                </Grid>
              </Grid>

            </Paper>

            <Paper sx={{padding: 1}} elevation={2} >
              {type === 'table' && <DynamicTable datasource={filteredData} />}
              {type === 'graph' && <BarChart datasource={filteredData} dimension={dimension} />}
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
