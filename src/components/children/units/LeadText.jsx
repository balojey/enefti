import { Typography } from "@mui/material";

export default function LeadText({ text }) {
    return (
        <Typography variant="h4" component="h4" sx={{ m: 1, textAlign: "start", flexGrow: 1 }}>
            {text}
        </Typography>
    );
}