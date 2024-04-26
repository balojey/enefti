import { Box, Button, Modal } from "@mui/material"
import TextInput from "./TextInput";
import LargeButton from "./LargeButton";
import { useState } from "react"
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 3,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

export default function EditDeleteItemModal({ itemId, item, editModalOpen, handleEditModalClose }) {
    const [artUrl, setArtUrl] = useState(item.artUrl);
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);

    const handleEditItem = async () => {
        if (artUrl === "" || title === "" || price < 0) return
        
        // Update an item
        const itemRef = doc(db, "nfts", itemId);;
        await updateDoc(itemRef, {
            artUrl: artUrl,
            title: title,
            description: description,
            price: price,
            dateUpdated: new Date(Date.now()),
        })
        handleEditModalClose()
    }

    const handleDeleteItem = async (item) => {
        await deleteDoc(doc(db, "nfts", itemId))
        handleEditModalClose()
    }

    return (
        <div>
            <Modal
                open={editModalOpen}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" sx={style}>
                    <TextInput label="Art Url" value={artUrl} setfunc={setArtUrl} />
                    <TextInput label="Title" value={title} setfunc={setTitle} />
                    <TextInput label="Description" value={description} setfunc={setDescription} />
                    <TextInput label="Price" value={price} setfunc={setPrice} type="number" />
                    <LargeButton content={"EDIT"} handler={handleEditItem} />
                    <LargeButton content={"DELETE"} bgcolor={"error.main"} handler={handleDeleteItem}/>
                </Box>
            </Modal>
        </div>
    );
}