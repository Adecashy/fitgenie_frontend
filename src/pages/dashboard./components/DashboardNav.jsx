import React from 'react'
import { Link } from 'react-router-dom'
import LogoutPage from '../../LogoutPage'

const defaultMenuItems = [
    {
        label: "Profile",
        path: "/dashboard/profile"
    },
    {
        label: "History",
        path: "/dashboard/history"
    },
    {
        label: "Generate",
        path: "/dashboard/generate-plan"
    }
]

const DashboardNav = () => {
  return (
     <div className='dashboard-nav'>
        <Link className='logo' to="/dashboard"><h2>Fit<span>Genie</span></h2></Link>
        <div className='userDashNav'>
            {/* <img src="" alt="" /> */}
            <div className='dash-items'>
                {
                    defaultMenuItems.map((item, index) => (
                        <Link className='menu' to={item.path} key={index}>{item.label}</Link>
                    ))
                }
            </div>
            <LogoutPage />
        </div>
    </div>
  )
}

export default DashboardNav