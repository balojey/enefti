import { Box, Typography, Container } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 0,
    borderRadius: 3
};

export default function ItemsPlaceholder({ heading="", body="" }) {
    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: 3,
            px: 1,
        }}>
            <Box sx={style}>
                <Box sx={{
                    p: 2
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h6">
                        {heading}
                    </Typography>
                    <Typography id="modal-modal-title" variant="p" component="p">
                        {body}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}