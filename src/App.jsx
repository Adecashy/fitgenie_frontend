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
      <vapi-widget assistant-id="bc07a52d-a100-40bc-9a02-9ff543c6c182" public-key="0ce6da1c-83e9-402d-80bf-f0fe8bb849bf"></vapi-widget>

<script
  src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
  async
  type="text/javascript"
></script>
    </div>
  )
}

export default App