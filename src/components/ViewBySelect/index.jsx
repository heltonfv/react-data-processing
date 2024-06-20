import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function({disabledViewByField, handleViewByFieldChange, selectedViewByField, viewByField}){
    return (
        <Box>
            <FormControl fullWidth size="small">
                <InputLabel>Visualizar por</InputLabel>
                <Select disabled={disabledViewByField} onChange={handleViewByFieldChange} value={selectedViewByField} fullWidth label="Visualizar por" size="small">
                {viewByField?.map((item) => (
                    <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
    )
}