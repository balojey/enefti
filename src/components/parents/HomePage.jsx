import '../../App.css'
import { useState, useEffect } from "react"
import TopBar from "../children/multi/TopBar";
import HomeContent from "../children/multi/HomeContent";
import BottomNavigationBar from "../children/multi/BottomNavigationBar";
import { useAuth } from "../../context/authContext/Index";
import LoginContent from "../children/multi/LoginContent";
import { getUser } from '../../circle/circle';
import CreateWalletPlease from '../children/multi/CreateWalletPlease';
import ChooseAWalletNotification from "../children/multi/ItemsPlaceholder";

export default function Home () {
    // bottom nav bar
    let navVal
    if (window.location.pathname === "/" || window.location.pathname === "") {
        navVal = 1
    }

    // auth
    let currentUser
    try {
        currentUser = useAuth()
    } catch (err) {
        currentUser = null
    }

    const [isOldUser, setIsOldUser] = useState()

    useEffect(() => {
        async function checkCircleAccountExists() {
            const oldCircleUser = await getUser(currentUser.currentUser.email)
            if (oldCircleUser) {
                if (oldCircleUser.pinStatus !== "ENABLED") {
                    setIsOldUser(false)
                    return
                }
                setIsOldUser(true)
            } else {
                setIsOldUser(false)
            }
        }
        checkCircleAccountExists()
    }, [currentUser])

    if (!currentUser || !currentUser.userLoggedIn) {
        return (
            <>
                <TopBar currentUser={currentUser.currentUser} />
                <LoginContent />
                <BottomNavigationBar value={navVal} />
            </>
        )
    }
    if (currentUser.userLoggedIn && !isOldUser) {
        return (
            <>
                <TopBar currentUser={currentUser.currentUser} />
                <CreateWalletPlease currentUser={currentUser.currentUser} />
                <BottomNavigationBar value={navVal} />
            </>
        )
    }
    return (
        <>
            <TopBar currentUser={currentUser.currentUser} />
            <HomeContent userEmail={currentUser.currentUser.email} /> 
            <BottomNavigationBar value={navVal} />
        </>
    )
}