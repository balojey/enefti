import '../../App.css'
import { useState, useEffect } from "react"
import HomeContent from "../children/multi/HomeContent";
import BottomNavigationBar from "../children/multi/BottomNavigationBar";
import { useAuth } from "../../context/authContext/Index";
import LoginContent from "../children/multi/LoginContent";
import { getUser } from '../../circle/circle';
import CreateWalletPlease from '../children/multi/CreateWalletPlease';

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
    
    return (
        <>
            <HomeContent userEmail={currentUser.currentUser.email} /> 
            <BottomNavigationBar value={navVal} />
        </>
    )
}