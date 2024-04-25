import { useState } from "react"
import { Box, TextField } from "@mui/material"

export default function TextInput({ label, value="", setfunc }) {

    return (
        <TextField
            id="outlined-controlled"
            label={label}
            value={value}
            sx={{
                width: "100%",
                my: 2
            }}
            onChange={(event) => {
                setfunc(event.target.value);
            }}
        />
    )
}