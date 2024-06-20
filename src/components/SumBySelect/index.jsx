import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function({handleSumFieldChange, selectedSumField, sumField}){
    return (
        <Box>
            <FormControl fullWidth size="small">
                <InputLabel>Somar</InputLabel>
                <Select onChange={handleSumFieldChange} value={selectedSumField} fullWidth label="Somar" size="small">
                    {sumField?.map((item) => (
                    <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}