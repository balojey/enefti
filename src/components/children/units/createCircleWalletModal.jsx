import { Box, Button, Modal } from "@mui/material"
import TextInput from "./TextInput";
import LargeButton from "./LargeButton";

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

export default function CreateCircleWalletModal({ newWalletModalOpen, handleNewWalletModalClose }) {
    return (
        <div>
            <Modal
                open={newWalletModalOpen}
                onClose={handleNewWalletModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" sx={style}>
                    <TextInput label="APPLICATION ID" value={""} disabled/>
                    <TextInput label="USER TOKEN" />
                    <TextInput label="ENCRYPTION KEY" />
                    <TextInput label="CHALLENGE ID" />
                    <LargeButton content={"EXECUTE"}/>
                </Box>
            </Modal>
        </div>
    );
}