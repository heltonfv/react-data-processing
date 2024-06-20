import { Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";


export default function({type, handleTypeChange, disabledDetailField}){
    return (
        <Box>
            <RadioGroup row value={type} onChange={handleTypeChange}>
                <FormControlLabel disabled={disabledDetailField} value="table" control={<Radio />} label="Tabela" />
                <FormControlLabel disabled={disabledDetailField} value="graph" control={<Radio />} label="Gráfico" />
            </RadioGroup>
        </Box>
    )    
}