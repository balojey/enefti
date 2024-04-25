import LeadText from "../units/LeadText"
import WalletBox from "../units/WalletBox"
import { Container, Button, Typography } from "@mui/material"
import LeadFollowerRow from "../units/LeadFollowerRow"
import { useState, useEffect } from "react"
import { listWallets, createUserToken } from "../../../circle/circle"

export default function AccountContent({ userEmail, handleSignOut }) {
    // User Wallets
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        async function getWallets() {
            const wallets = await listWallets(userEmail)
            setWallets([...wallets])
        }
        getWallets()
    }, [userEmail])

    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: 3,
            px: 1,
        }}>
            <LeadText text={"Account Information"} />
            <Typography variant="p" component="p" sx={{ m: 1, textAlign: "start", flexGrow: 1 }}>
                {userEmail}
            </Typography>

            <LeadFollowerRow userEmail={userEmail} />
            {wallets ? wallets.map(wallet => (
                <WalletBox key={wallet.address} wallet={wallet} />)
                ) : null}
            <Button variant="text" onClick={handleSignOut}>Logout</Button>
        </Container>
    )
}