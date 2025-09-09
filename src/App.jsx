import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import BugPage from './pages/Bug.jsx'
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Leaderboard from "./pages/Leaderboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
        </div>
    )
  }


  return (
    <>
      {/* {isLoggedIn && <Header />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bug" element={<BugPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  )
}

export default App