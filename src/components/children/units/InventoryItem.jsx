import { Box, Stack, Button, Grid } from "@mui/material"
import EditDeleteItemModal from "./EditDeleteItemModal"
import { useState } from "react";

export default function InventoryItem({ itemId, item }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => setEditModalOpen(false);
    
    return (
        <Grid item xs={6} md={6} sx={{
            mb: 15
        }}>
            <Box sx={{
                width: "100%",
                height: 200,
                bgcolor: "secondary.main",
                borderRadius: 8,
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
                <EditDeleteItemModal itemId={itemId} item={item} editModalOpen={editModalOpen} handleEditModalClose={handleEditModalClose} />
            </Box>
        </Grid>
    )
}