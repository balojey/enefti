import { Typography, Box } from "@mui/material";

export default function Logo({ flexGrow }) {
    return (
        // <Typography variant="h4" component="h1" sx={{ m: 1, textAlign: "start", flexGrow: flexGrow }}>
        //     ENEFTI
        // </Typography>
        <Box
            component="img"
            alt="An NFT Marketplace"
            src="../../../public/default-monochrome.svg"
            sx={{
                height: 50,
                width: 100,
                objectFit: "contain",
                objectPosition: "center",
            }}
            />
    );
}