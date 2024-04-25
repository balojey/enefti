import { Button } from "@mui/material"

export default function LargeButton({ content, bgcolor="primary.main", handler }) {
    return (
        <Button variant="contained" onClick={handler} sx={{
            width: "100%",
            height: 50,
            bgcolor: bgcolor,
            my: 1,
            borderRadius: 2
        }}>
            {content}
        </Button>
    );
}