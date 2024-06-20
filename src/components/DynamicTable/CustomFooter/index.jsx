import { Box, Stack, Grid, Typography } from "@mui/material"

export function CustomFooter({total}){
    return (
        <Box
            display="flex"
            flexDirection="row" 
            alignItems="center"
            borderTop={0.5}
            borderColor="#E0E0E0"
            justifyContent="space-between"
        >

            <Grid container padding={1}>
                    <Grid item width={125} sx={{ textAlign: 'left' }}>
                        <Typography fontWeight={"bold"}>Total</Typography>
                    </Grid>
                {total.map((itens, index) => (
                    <Grid item width={125} sx={{ textAlign: 'left' }}>
                        <Typography>{itens}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}