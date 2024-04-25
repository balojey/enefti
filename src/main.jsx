import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from "./theme"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from "./components/parents/HomePage"
import InventoryPage from "./components/parents/InventoryPage"
import AccountPage from "./components/parents/AccountPage"
import 'firebaseui/dist/firebaseui.css'
import { AuthProvider } from './context/authContext/Index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/inventory',
    element: <InventoryPage />
  },
  {
    path: '/account',
    element: <AccountPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
