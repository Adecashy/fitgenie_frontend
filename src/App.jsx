import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicPages from './components/layout/PublicPages'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'sonner'
import DashboardLayout from './pages/dashboard./DashboardLayout'
import UserProvider from './contexts/UserContext'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <div>
            <Toaster richColors position='top-right' closeButton visibleToasts={1} />
            <Routes>
              <Route path='/*' element={<PublicPages />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/dashboard/*' element={<DashboardLayout />} />
            </Routes>
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}

export default App