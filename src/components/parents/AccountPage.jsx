import '../../App.css'
import { useState, useEffect } from "react"
import BottomNavigationBar from "../children/multi/BottomNavigationBar";
import AccountContent from "../children/multi/AccountContent";
import { useAuth } from "../../context/authContext/Index";
import LoginContent from "../children/multi/LoginContent";
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

    const handleSignOut = () => {
        doSignOut().then(() => {
            navigate("/")
        })
    }
    return (
        <>
            <AccountContent userEmail={currentUser.currentUser.email} handleSignOut={handleSignOut} />
            <BottomNavigationBar value={navVal} />
        </>
    )
}