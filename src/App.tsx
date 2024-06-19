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
import { FaDatabase } from "react-icons/fa6";
import StackedBarChart from './components/StackedBarChart';
import BarChart from './components/BarChart';
import _ from 'lodash';

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

  const [ sumField, setSumField ] = useState<string[]>();
  const [ selectedSumField, setSelectedSumField ] = useState<string>('');

  const [ viewByField, setViewByField ] = useState<string[]>();
  const [ selectedViewByField, setSelectedViewByField ] = useState<string>('');
  const [ disabledViewByField, setDisabledViewByField ] = useState<boolean>(true);

  const [ detailField, setDetailField ] = useState<string[]>();
  const [ selectedDetailField, setSelectedDetailField ] = useState<string>('');
  const [ disabledDetailField, setDisabledDetailField ] = useState<boolean>(true);

  const [ type, setType ] = useState("table");

  const [ dimension, setDimension ] = useState(false);

  const handleDatasourceFieldChange = (event:SelectChangeEvent) => {
    setSelected(event.target.value);
    setSelectedSumField('');
    setSelectedViewByField('');
    setSelectedDetailField('');
    setDisabledViewByField(true);
    setDisabledDetailField(true);
  }

  const handleSumFieldChange = (event: SelectChangeEvent) => {
    setSelectedSumField(event.target.value);
    setDisabledViewByField(false);
  }

  const handleViewByFieldChange = (event:SelectChangeEvent) => {
    setSelectedViewByField(event.target.value);

    const groups = _.groupBy(data, event.target.value as string);

    const sumByGroup = _.map(groups, (itens, index) => {
      return {
        visualizacao: index as string,
        soma: _.sumBy(itens, selectedSumField as string)
      };
    });

    setFilteredData(sumByGroup);
    setDisabledDetailField(false);
  }

  const handleDetailFieldChange = (event: SelectChangeEvent) => {
    setSelectedDetailField(event.target.value);

    const year = _.groupBy(data, event.target.value as string);

    const category = _.map(year, (itens, index) => {
      const grouped = _.groupBy(itens, selectedViewByField);
        return {
          [index]: _.map(grouped, (iten, i) => {
          return {
            [i]: _.sumBy(iten, selectedSumField as string)
          }
        })
      }      
    });

    let columns:any = [];
    let rows:any = [];

    //get all rows
    _.map(category, (itens, index) => {
      rows.push(Object.keys(itens)[0])
    })

    //get all columns
    const findLeaves = (category:any) => {
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

    const newJson:any = [];

    _.map(rows, (itens:any, index:any) => {
      let newObj:any = {ano: itens }
      _.map(columns, (iten:any, inde:any) => {
        newObj[iten] = null;
        _.map(columns, (ite: any, ind: any) => {
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


  const handleTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
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
                    <InputLabel>Datasource</InputLabel>
                    <Select onChange={handleDatasourceFieldChange} value={selected} fullWidth label="Datasource" size="small">
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

              <RadioGroup row value={type} onChange={handleTypeChange}>
                <FormControlLabel disabled={disabledDetailField} value="table" control={<Radio />} label="Tabela" />
                <FormControlLabel disabled={disabledDetailField} value="graph" control={<Radio />} label="Gráfico" />
              </RadioGroup>
            </Paper>

            <Paper sx={{padding: 1}} elevation={2} >
              {type === 'table' && <DynamicTable datasource={filteredData} />}
              {type === 'graph' && <BarChart datasource={filteredData} dimension={dimension} />}
              {/* {type === 'stackedBarChart' && <StackedBarChart datasource={filteredData} />} */}
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
