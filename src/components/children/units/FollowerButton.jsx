import { Button, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"
import CreateCircleWalletModal from "./createCircleWalletModal"
import { v4 as uuid4 } from "uuid"
import { createWallet } from "../../../circle/utils"

export default function FollowerButton({ userEmail }) {
    return (
        <>
            <Button variant="contained" onClick={ async () => {
                await createWallet(userEmail);
            }} sx={{
                width: 80,
                height: 30,
                bgcolor: "primary.main",
                my: 1,
                borderRadius: 2
            }}>
                <Add />
                <Typography variant="p" component="p" sx={{fontWeight: "bold"}}>ADD</Typography>
            </Button>
        </>
    )
}