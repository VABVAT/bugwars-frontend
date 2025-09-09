import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import BugPage from './pages/Bug.jsx'
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Leaderboard from "./pages/Leaderboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
        const response = await fetch(`${baseUrl}/api/auth/me`, {
          credentials: 'include', // send cookies
        })
        if (response.ok) {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error checking login status:', error)
      } finally {
        setIsLoading(false)
      }
    }
    checkLogin()
  }, [])

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
        </div>
    )
  }


  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/bug" element={<BugPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  )
}

export default App