import { useState } from "react"
import { Typography } from "@mui/material"


export default function CurrentWalletBalance({ balance }) {

    return (
        <div>
            <Typography variant="p" component="p" sx={{
                fontWeight: "bold",
                fontSize: 18,
            }}>
                ${balance}
            </Typography>
        </div>
    )
}