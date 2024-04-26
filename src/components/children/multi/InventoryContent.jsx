import { Container, Button, Typography, Grid, Box } from "@mui/material"
import { Add } from "@mui/icons-material"
import InventoryItem from "../units/InventoryItem"
import AddItemModal from "../units/AddItemModal"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase"
import { getWallet } from "../../../circle/utils"
import ItemsPlaceholder from "./ItemsPlaceholder";

export default function InventoryContent({ reloadPage, userEmail, addModalOpen, handleAddModalClose, handleAddModalOpen }) {
    const [items, setItems] = useState()
    
    useEffect(() => {
        async function populateInventory() {
            // Get user wallet
            const wallet = await getWallet(userEmail)

            const q = query(collection(db, "nfts"), where("walletAddress", "==", wallet.address));
            const querySnapshot = await getDocs(q);
            let docs = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                docs.push(doc);
            })
            if (docs.length > 0) setItems(docs)
        }
        populateInventory()
    }, [userEmail])
    
    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: 3,
            px: 1,
        }}>
            <Button variant="contained" onClick={handleAddModalOpen} sx={{
                height: 50,
                borderRadius: 2,
            }}>
                <Add />
                <Typography variant="p" component="p" sx={{fontWeight: "bold"}}>ADD</Typography>
            </Button>
            <Box sx={{ flexGrow: 1, my: 5 }}>
                <Grid container spacing={2}>
                    {items ? items.map((item) => (
                        <InventoryItem reloadPage={reloadPage} key={item.id} itemId={item.id} item={item.data()} />
                    )) : (
                        <ItemsPlaceholder heading={"Oh oh!"} body={"You have no items in your inventory. You can add though!"} />
                    )}
                </Grid>
            </Box>
            <AddItemModal addModalOpen={addModalOpen} handleAddModalClose={handleAddModalClose} />
        </Container>
    )
}