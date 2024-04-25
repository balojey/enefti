import { useState } from "react"
import { Container, Box, Button, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { doSignInWithGoogle } from "../../../firebase/auth"


export default function LoginContent() {
    const [isSigningIn, setIsSigningIn] = useState(false)

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: 3,
            px: 1,
            width: "100%",
            height: "100%",
        }}>
            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Button variant="outlined" disabled={isSigningIn} onClick={(e) => {onGoogleSignIn(e)}} sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                }}>
                    <Google />
                    <Typography variant="p" component="p">{isSigningIn ? "Signing In..." : "Continue With Google"}</Typography>
                </Button>
            </Box>
        </Container>
    )
}