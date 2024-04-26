import './App.css'
import HomePage from "./components/parents/HomePage"
import InventoryPage from "./components/parents/InventoryPage"
import AccountPage from "./components/parents/AccountPage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TopBar from "./components/children/multi/TopBar";
import { useAuth } from "./context/authContext/Index";
import LoginContent from "./components/children/multi/LoginContent";
import { useState, useEffect } from 'react'
import CreateWalletPlease from './components/children/multi/CreateWalletPlease';
import { getUser } from './circle/circle'

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

function App() {
  // auth
  let currentUser
  try {
      currentUser = useAuth()
  } catch (err) {
      currentUser = null
  }

  // circle auth
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

  return (
    <>
      <TopBar currentUser={currentUser.currentUser} />
      {currentUser && currentUser.userLoggedIn
      ? isOldUser
        ? <RouterProvider router={router} />
        : <CreateWalletPlease currentUser={currentUser.currentUser} />
      : <LoginContent />
      }
    </>
  )
}

export default App
