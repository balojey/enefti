import { useState } from "react"
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material"
import { HomeOutlined, StorefrontOutlined, AccountCircleOutlined } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"

export default function BottomNavigationBar({ value }) {
    return (
        <Box sx={{
            width: "inherit",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
        }}>
        <BottomNavigation
            showLabels
            // value={value}
        >
            <BottomNavigationAction component={RouterLink} to="/" label="Home" icon={<HomeOutlined />} />
            <BottomNavigationAction component={RouterLink} to="/inventory" label="Inventory" icon={<StorefrontOutlined />} />
            <BottomNavigationAction component={RouterLink} to="/account" label="Account" icon={<AccountCircleOutlined />} />
        </BottomNavigation>
        </Box>
    )
}