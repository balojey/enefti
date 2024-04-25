import { Box, Stack, Button } from "@mui/material"
import BuyItemModal from "./BuyItemModal";
import { useState } from "react";

export default function MarketPlaceItem({ itemId, item, userEmail }) {
    const [buyOpen, setBuyOpen] = useState(false);
    const handleBuyOpen = () => setBuyOpen(true);
    const handleBuyClose = () => setBuyOpen(false);

    return (
        <Box sx={{
            width: "100%",
            height: 300,
            bgcolor: "secondary.main",
            borderRadius: 8,
            mb: 5
        }}>
            <Stack spacing={0}>
            <Box
                component="img"
                sx={{
                    height: 250,
                    width: "inherit",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderTopRightRadius: 32,
                    borderTopLeftRadius: 32,
                }}
                alt={item.description}
                src={item.artUrl}
            />
            <Button variant="contained" onClick={handleBuyOpen} sx={{
                height: 50,
                borderBottomRightRadius: 32,
                borderBottomLeftRadius: 32,
            }}>Buy</Button>
            </Stack>
            <BuyItemModal userEmail={userEmail} itemId={itemId} item={item} handleBuyClose={handleBuyClose} open={buyOpen} />
        </Box>
    )
}