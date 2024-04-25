import '../../App.css'
import { useState, useEffect } from "react"
import BottomNavigationBar from "../children/multi/BottomNavigationBar";
import AccountContent from "../children/multi/AccountContent";
import { useAuth } from "../../context/authContext/Index";
import LoginContent from "../children/multi/LoginContent";
import TopBar from '../children/multi/TopBar';
import { doSignOut } from "../../firebase/auth"
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../circle/circle';
import CreateWalletPlease from '../children/multi/CreateWalletPlease';

export default function AccountPage() {
    const navigate = useNavigate()

    // bottom nav bar
    let navVal
    if (window.location.pathname === "/account") {
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

    const handleSignOut = () => {
        doSignOut().then(() => {
            navigate("/")
        })
    }

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
            <AccountContent userEmail={currentUser.currentUser.email} handleSignOut={handleSignOut} />
            <BottomNavigationBar value={navVal} />
        </>
    )
}