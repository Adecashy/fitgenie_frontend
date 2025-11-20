import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../../pages/LandingPage'
import SignupPage from '../../pages/SignupPage'
import LoginPage from '../../pages/LoginPage'

const PublicPages = () => {
  return (
    <div>
        <Navbar></Navbar>

        <Routes>
            <Route path='/' element={<LandingPage />} />
        </Routes>
    </div>
  )
}

export default PublicPages