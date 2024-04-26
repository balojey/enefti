import { Box, Button, Modal } from "@mui/material"
import TextInput from "./TextInput";
import LargeButton from "./LargeButton";
import FilePicker from "./FilePicker";
import { db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid4 } from "uuid"
import { listWallets } from "../../../circle/circle";

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

export default function AddItemModal({ addModalOpen, handleAddModalClose }) {
    const [artUrl, setArtUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const handleAddItem = async () => {
        if (artUrl === "" || title === "" || price < 0) return

        // Get user wallet
        const wallets = await listWallets(currentUser.email);
        const wallet = wallets[0]

        // Add a new item
        await setDoc(doc(db, "nfts", uuid4()), {
            artUrl: artUrl,
            title: title,
            description: description,
            price: price,
            walletAddress: wallet.address,
            dateAdded: new Date(Date.now()),
            dateUpdated: new Date(Date.now()),
        })
        handleAddModalClose()
        setArtUrl("")
        setTitle("")
        setDescription("")
        setPrice(0)
    }
    return (
        <div>
            <Modal
                open={addModalOpen}
                onClose={handleAddModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" sx={style}>
                    <TextInput label="Art URL" value={artUrl} setfunc={setArtUrl} />
                    <TextInput label="Title" value={title} setfunc={setTitle} />
                    <TextInput label="Description" value={description} setfunc={setDescription} />
                    <TextInput label="Price" value={price} setfunc={setPrice} type={"number"} />
                    <LargeButton content={"ADD"} handler={handleAddItem} />
                </Box>
            </Modal>
        </div>
    );
}