import {
    Box
} from '@mui/material';
import { 
    DataGrid,
    GridRowsProp,
    GridColDef
} from '@mui/x-data-grid';
import { iDatasource1Props } from './@types';
import { ptBR } from '@mui/x-data-grid/locales';
import { randomId } from "../../utils/randomId";

interface iDynamicTable {
    datasource: Array<iDatasource1Props>,
}

export default function DynamicTable({datasource}: any){
    const keys = Object.keys(datasource[0]);

    const rows: GridRowsProp = datasource;
    const columns: GridColDef[] = keys.map(function(item, index){
        return {
            field: item,
            headerName: item.toUpperCase()
        };
    });

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