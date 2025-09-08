import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'
import Home from './pages/Home'
import { UserDataContext } from './context/UserContext'



const App = () => {
  const { userData ,setuserData } = useContext(UserDataContext)

  // Show a loading screen while userData is being fetched (optional)
  if (userData === undefined) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route
        path="/signup"
 element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  )
}

export default App
