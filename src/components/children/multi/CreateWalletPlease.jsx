import { Typography, Button } from "@mui/material";
import { getUser } from "../../../circle/circle";
import { createNewUser } from "../../../circle/utils";

export default function CreateWalletPlease({ currentUser }) {
    const handleCreateWallet = async () => {

        await createNewUser(currentUser)

        // // Get user status
        // const userStatus = getUserStatus(userToken)

        // // Verify pinStatus and securityQuestionStatus
        // if (userStatus.pinStatus !== "ENABLED" || userStatus.securityQuestionStatus !== "ENABLED") {
        //     console.log("USER FAILURE!!!")
        // }

        // // Get wallets
        // const wallets = listWallets(userToken)
    }

    return (
        <>
            <Typography variant="h4" component="h4" sx={{ m: 1, textAlign: "center", flexGrow: 1 }}>
                Create a wallet first, please!
            </Typography>
            <Button variant="contained" onClick={handleCreateWallet} sx={{ m: 1, textAlign: "start", flexGrow: 1 }}>
                Create a wallet
            </Button>
        </>
    );
}