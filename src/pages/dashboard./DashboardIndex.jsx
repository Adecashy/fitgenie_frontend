import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardIndex = () => {
  const navigate = useNavigate()
  const startPlanBuildUp = () => {
    navigate("/dashboard/generate-plan")
  }
  return (
    <div>
      <h1>WELCOME TO FITGENIE</h1>
      <p>click on the start button to build your plan</p>
      <button onClick={startPlanBuildUp}>Start</button>
    </div>
  )
}

export default DashboardIndex