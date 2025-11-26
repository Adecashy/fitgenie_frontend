import React from 'react'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()

  const initializeSubscription = async (plan) => {
    try {
      const res = await fetch("http://localhost:7707/api/subscription/initialize", {
        method: "POST",
        body: JSON.stringify({plan}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const result = await res.json()
      console.log(result)
      console.log(result.data.authorization_url)
      navigate(`${result.data.authorization_url}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>UPGRADE TO PREMIUM</h1>
      <div className='plan-con'>
        <h3>Choose your subscription plan</h3>
        <div className='plans-wrapper'>
          <div className='each-plan-con'>
            <p>Monthly</p>
            <span>#10,000.00</span>
            <ul>
              <li>Basic Meal Plan</li>
              <li>Limited AI Coach Access</li>
              <li>Weekly Progress Tracking</li>
              <li>Email Support Only</li>
            </ul>
            <button onClick={()=>{
              initializeSubscription("monthly")
            }}>Get Started</button>
          </div>
          <div className='each-plan-con'>
            <p>Quarterly</p>
            <span>#28,000.00</span>
            <ul>
              <li>Full Meal Plan with Alternatives</li>
              <li>Unlimited AI Coach Chat</li>
              <li>Advanced Progress Tracking</li>
              <li>Priority Support</li>
              <li>Merch + Supplements</li>
            </ul>
            <button onClick={()=>{
              initializeSubscription("quarterly")
            }}>Get Started</button>
          </div>
          <div className='each-plan-con'>
            <p>Yearly</p>
            <span>#99,999.00</span>
            <ul>
              <li>Full Year Multi-Phase Fitness Program</li>
              <li>Custom Meal Plans Every Month</li>
              <li>Unlimited AI Coach Chat</li>
              <li>1-on-1 Monthly Check-Ins</li>
              <li>Exclusive Programs + Full Form Analysis</li>
              <li>Free Annual Fitness Report</li>
              <li>Merch + Supplements + premium rewards</li>
            </ul>
            <button onClick={()=>{
              initializeSubscription("yearly")
            }}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History