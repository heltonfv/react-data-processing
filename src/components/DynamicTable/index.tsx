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

interface iDynamicTable {
    rows: Array<iDatasource1Props>,
}

export default function DynamicTable({rows}: iDynamicTable){
    return (
        <Box>
            <DataGrid 
                rows={rows}
                columns={columns}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                pagination
            />
      </Box>
    )
}