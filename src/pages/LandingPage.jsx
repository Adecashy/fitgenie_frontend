import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='body'>
        <div className='content'>
            <div>
                <img src="../src/assets/meal planner.png" alt="" width="400px" />
            </div>
            <div className='quotes'>
                <h4>EAT SMART, LIVE <span>STRONG</span></h4>
                <p>Your health journey starts with a smile — let’s optimize your path to a healthier you</p>
                <button>Start Meal Survey</button>
            </div>
        </div>
    </div>
  )
}

export default LandingPage