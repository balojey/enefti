import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import Logo from "../units/Logo"
import CurrentWalletBalance from "../units/CurrentWalletBalance"
import { Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { listWallets, getTokenBalances, createUserToken } from "../../../circle/circle";
import { getWallet } from "../../../circle/utils";


export default function TopBar({ currentUser }) {
    const [USDCBalance, setUSDCBalance] = useState(0)

    useEffect(() => {
        async function getBalance() {
            const wallet = await getWallet(currentUser.email);
            const { userToken } = await createUserToken(wallet.userId)
            const balances = await getTokenBalances(wallet.userId, userToken, wallet.id)
            setUSDCBalance(balances[1].amount)
        }
        getBalance()
    }, [currentUser])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <Logo flexGrow={1}/>
                    <CurrentWalletBalance balance={USDCBalance} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
