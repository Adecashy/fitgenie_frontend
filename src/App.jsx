import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicPages from './components/layout/PublicPages'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Toaster richColors position='top-right' closeButton visibleToasts={1} />
          <Routes>
            <Route path='/*' element={<PublicPages />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App