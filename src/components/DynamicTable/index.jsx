import {
    Box
} from '@mui/material';
import { 
    DataGrid,
} from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { randomId } from "../../utils/randomId";
import { CustomFooter } from './CustomFooter';
import _ from 'lodash';

export default function DynamicTable({datasource}){
    const keys = Object.keys(datasource[0]);

    const rows = datasource;
    const columns = keys.map(function(item, index){
        return {
            field: item,
            headerName: item.toUpperCase()
        };
    });

    const sum = _.sumBy(rows, 'soma');

    return (
        <Box>
            <DataGrid 
                rows={rows}
                columns={columns}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                pagination
                density="compact"
                getRowId={() => randomId()}
                slots={
                    {
                        footer: CustomFooter
                    }
                }
                slotProps={
                    {
                        footer: {
                            total: sum
                        }
                    }
                }
            />
      </Box>
    )
}