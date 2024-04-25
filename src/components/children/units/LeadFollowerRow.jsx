import { Box } from "@mui/material"
import LeadText from "./LeadText";
import FollowerButton from "./FollowerButton";

export default function LeadFollowerRow({ userEmail }) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Box sx={{ flexGrow: 1 }}>
                <LeadText text={"Wallet"} />
            </Box>
            {/* <Box sx={{ flexGrow: 1,  }}>
                <FollowerButton userEmail={userEmail}  />
            </Box> */}
        </Box>
    );
}