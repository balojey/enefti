import { useState, useEffect } from "react"
import '../../App.css'
import BottomNavigationBar from "../children/multi/BottomNavigationBar";
import InventoryContent from "../children/multi/InventoryContent";
import { useAuth } from "../../context/authContext/Index";
import LoginContent from "../children/multi/LoginContent";
import { getUser } from '../../circle/circle';
import CreateWalletPlease from '../children/multi/CreateWalletPlease';

export default function InventoryPage() {
    // bottom nav bar
    let navVal
    if (window.location.pathname === "/inventory") {
        navVal = 1
    }

    // auth
    let currentUser
    try {
        currentUser = useAuth()
    } catch (err) {
        currentUser = null
    }
    
    return (
        <>
            <InventoryContent userEmail={currentUser.currentUser.email} /> 
            <BottomNavigationBar value={navVal} />
        </>
    )
}