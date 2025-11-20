import React from 'react'
import DashboardNav from './components/DashboardNav'
import { Route, Routes } from 'react-router-dom'
import DashboardIndex from './DashboardIndex'
import ProfilePage from './ProfilePage'
import History from './History'
import UpdateProfile from './UpdateProfile'
import GeneratePlan from './GeneratePlan'

const DashboardLayout = () => {
  return (
    <div>
        <DashboardNav />
        <div>
          <Routes>
            <Route path='/' element={<DashboardIndex />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path='/history' element={<History />} />
            <Route path='/generate-plan' element={<GeneratePlan />} />
          </Routes>
        </div>
    </div>
  )
}

export default DashboardLayout