import { Container } from "@mui/material"
import MarketPlaceItem from "../units/MarketplaceItem"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase"
import { getWallet } from "../../../circle/utils"
import ItemsPlaceholder from "./ItemsPlaceholder";

export default function HomeContent({ userEmail }) {
    const [items, setItems] = useState(null)
    
    useEffect(() => {
        async function populateMarketPlace() {
            // Get user wallet
            const wallet = await getWallet(userEmail)

            const q = query(collection(db, "nfts"), where("walletAddress", "!=", wallet.address));
            const querySnapshot = await getDocs(q);
            let docs = []
            // console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                docs.push(doc);
            })
            if (docs.length > 0) setItems(docs)
        }
        populateMarketPlace()
    }, [userEmail])

    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: 3,
            px: 1,
        }}>
            {items ? items.map((item) => 
                (<MarketPlaceItem key={item.id} userEmail={userEmail} itemId={item.id} item={item.data()} />)
            ) : (
                <ItemsPlaceholder heading={"Whoops"} body={"All other items has been sold."} />
            )}
        </Container>
    )
}