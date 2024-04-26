import { Container } from "@mui/material"
import MarketPlaceItem from "../units/MarketplaceItem"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase"
import { getWallet } from "../../../circle/utils"
import ItemsPlaceholder from "./ItemsPlaceholder";

export default function HomeContent({ userEmail }) {
    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        async function populateMarketPlace() {
            // Get user wallet
            const wallet = await getWallet(userEmail)

            const q = query(collection(db, "nfts"), where("walletAddress", "!=", wallet.address));
            const querySnapshot = await getDocs(q);
            let docs = []
            querySnapshot.forEach((doc) => {
                docs.push(doc);
            })
            if (docs.length > 0) setItems(docs)
        }
        populateMarketPlace()
        setLoading(false)
    }, [userEmail])

    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: 3,
            px: 1,
        }}>
            {!items
            ? <ItemsPlaceholder heading={"Whoops"} body={"If you are still seeing this, it means there are no more items to buy."} />
            : items.map((item) => (
                <MarketPlaceItem key={item.id} userEmail={userEmail} itemId={item.id} item={item.data()} />
            ))}
        </Container>
    )
}