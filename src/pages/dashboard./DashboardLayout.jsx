import React from 'react'
import DashboardNav from './components/DashboardNav'
import { Route, Routes } from 'react-router-dom'
import DashboardIndex from './DashboardIndex'
import ProfilePage from './ProfilePage'
import History from './History'
import UpdateProfile from './UpdateProfile'
import GeneratePlan from './GeneratePlan'
import Footer from '../../components/layout/Footer'

const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen flex-col overflow-x-hidden bg-[#080d1b] text-white'>
        <DashboardNav />
        <main className='mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10'>
          <Routes>
            <Route path='/' element={<DashboardIndex />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path='/history' element={<History />} />
            <Route path='/generate-plan' element={<GeneratePlan />} />
          </Routes>
        </main>
        <Footer />
    </div>
  )
}

export default DashboardLayout