import { Box, Stack, Typography } from "@mui/material"

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

            <Stack alignItems="center" justifyContent="space-between" direction="row">
                <Stack sx={{ flexGrow: 0.4, padding: 1 }}>
                    <Typography align="center"><b>Total: {total}</b></Typography>
                </Stack>
            </Stack>
        </Box>
    )
}