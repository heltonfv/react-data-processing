import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function({disabledDetailField, handleDetailFieldChange, selectedDetailField, detailField}){
    return (
        <Box>
            <FormControl fullWidth size="small">
                <InputLabel>Detalhar por</InputLabel>
                <Select disabled={disabledDetailField} onChange={handleDetailFieldChange} value={selectedDetailField} fullWidth label="Detalhar por" size="small">
                {detailField?.map((item) => (
                    <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
    )
}