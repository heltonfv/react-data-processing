import {
    Box
} from '@mui/material';
import { 
    DataGrid
} from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { randomId } from "../../utils/randomId";
import { CustomFooter } from './CustomFooter';
import _ from 'lodash';

export default function DynamicTable({datasource, sumValue}){
    const keys = Object.keys(datasource[0]);

    const rows = datasource;
    const columns = keys.map(function(item, index){
        return {
            field: item,
            headerName: item.toUpperCase(),
            width: 125
        };
    });

    // let valorFinal = [];
    // let valorSomado = _.sumBy(rows, 'soma');

    // if(typeof valorSomado === 'number'){
    //     valorFinal = valorSomado;
    // }

    return (
        <Box>
            <DataGrid 
                rows={rows}
                columns={columns}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                pagination
                density="compact"
                getRowId={() => randomId()}
            />
      </Box>
    )
}