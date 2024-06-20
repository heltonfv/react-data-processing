import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function({handleDatasourceFieldChange, selected, datasources}){
    return (
        <Box>
            <FormControl fullWidth size="small">
                <InputLabel>Fonte de dados</InputLabel>
                <Select onChange={handleDatasourceFieldChange} value={selected} fullWidth label="Fonte de dados" size="small">
                {datasources.map((item) => (
                    <MenuItem value={item.name}>{item.title}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
    )
}