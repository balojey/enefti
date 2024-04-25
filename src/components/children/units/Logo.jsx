import { Typography } from "@mui/material";

export default function Logo({ flexGrow }) {
    return (
        <Typography variant="h4" component="h1" sx={{ m: 1, textAlign: "start", flexGrow: flexGrow }}>
            ENEFTI
        </Typography>
    );
}