import { ThemeProvider, Box, Typography, Button } from "@mui/material";
import { useFaucet, getTokenBalances, createUserToken } from "../../../circle/circle";
import { useEffect, useState } from "react";

export default function WalletBox({ wallet }) {
    const [USDCBalance, setUSDCBalance] = useState(0)

    const handleUseFaucet = async () => {
        await useFaucet(wallet.address);
    }

    useEffect(() => {
        async function getBalances() {
            const { userToken } = await createUserToken(wallet.userId)
            const tokenBalances = await getTokenBalances(wallet.userId, userToken, wallet.id);
            setUSDCBalance(tokenBalances[1].amount)
        }
        getBalances()
    }, [wallet])

    return (
        <Box
        sx={{
            width: "100%",
            height: 150,
            borderRadius: 1,
            borderColor: "primary.main",
            borderStyle: "solid",
            borderWidth: 2,
            p: 2
        }}
        >
            <Typography variant="p" component="p" sx={{
                textAlign: "start",
                wordWrap: "break-word",
            }}>
                {wallet.address}
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                width: "100%",
                mt: 2,
                alignItems: "center",
            }}>
                <Typography variant="p" component="p" sx={{mr: 2}}>${USDCBalance}</Typography>
                <Button variant="contained" onClick={handleUseFaucet} sx={{mr: 2}}>Faucet</Button>
            </Box>
        </Box>
    );
}