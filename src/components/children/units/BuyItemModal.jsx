import { Box, Button, Typography, Modal } from "@mui/material"
import { useState } from "react";
import { transact } from "../../../circle/utils";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getWallet } from "../../../circle/utils";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 0,
    borderRadius: 3
};

export default function BuyItemModal({ userEmail, itemId, item, open, handleBuyClose }) {
    const handleBuy = async () => {
        // Get user wallet
        const wallet = await getWallet(userEmail)

        await transact(userEmail, item.price, item.walletAddress)

        // Update bought item
        const itemRef = doc(db, "nfts", itemId);;
        // await updateDoc(itemRef, {
        //     walletAddress: wallet.address,
        //     dateBought: new Date(Date.now()),
        // })

        handleBuyClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleBuyClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        component="img"
                        sx={{
                            height: 200,
                            width: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                        }}
                        alt={item.description}
                        src={item.artUrl}
                    />
                    <Box sx={{
                        p: 2
                    }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {item.title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontStyle: "italic" }}>
                            {item.description}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            ${item.price}
                        </Typography>
                    </Box>
                    <Button variant="contained" onClick={handleBuy} sx={{
                        width: "100%",
                        height: 50,
                        borderRadius: 0,
                    }}>
                        Pay
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}