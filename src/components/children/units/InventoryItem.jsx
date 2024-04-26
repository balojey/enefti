import { Box, Stack, Button, Grid, Typography } from "@mui/material"
import EditDeleteItemModal from "./EditDeleteItemModal"
import { useState } from "react";

export default function InventoryItem({ reloadPage, itemId, item }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => {
        setEditModalOpen(false);
        reloadPage();
    }
    
    return (
        <Grid item xs={6} md={6} sx={{
            mb: 15
        }}>
            <Box sx={{
                width: "100%",
                height: 200,
                bgcolor: "secondary.main",
                borderRadius: 8,
                position: "relative",
            }}>
                <Stack spacing={0}>
                <Box
                    component="img"
                    sx={{
                        height: 250,
                        width: "inherit",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }}
                    alt={item.description}
                    src={item.artUrl}
                />
                <Button variant="contained" onClick={handleEditModalOpen} sx={{
                    height: 50,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                }}>Edit</Button>
                </Stack>
                <Box sx={{
                    position: "absolute",
                    top: -20,
                    right: -15,
                    bgcolor: "secondary.main",
                    p: 1,
                    borderRadius: "50%",
                }}>
                    <Typography variant="p" component="p" sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}>${item.price}</Typography>
                </Box>
                <EditDeleteItemModal itemId={itemId} item={item} editModalOpen={editModalOpen} handleEditModalClose={handleEditModalClose} />
            </Box>
        </Grid>
    )
}