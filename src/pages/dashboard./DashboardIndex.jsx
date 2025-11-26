import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../contexts/UserContext'
import { toast } from 'sonner'

const DashboardIndex = () => {
  const navigate = useNavigate()
  const startPlanBuildUp = () => {
    navigate("/dashboard/generate-plan")
  }
  const token = JSON.parse(localStorage.getItem("token"))
  const [workoutPlan, setWorkoutPlan] = useState([])
  const [openIndex, setOpenIndex] = useState(null)
  const { profile, getUserProfile } = useContext(userContext)

  useEffect(()=>{
    getLatestFitPlan()
    getUserProfile()
  }, [])

  console.log(profile)
  
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const generateFitPlan = async () => {
    try {
      const res = await fetch("http://localhost:7707/api/fit-plan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
      } else if (!result.success) {
        toast.error(result.message)
        // navigate("/dashboard/history")
      }
      // console.log(result)
    } catch (error) {
      console.log(error)
      toast.error(result.message || "SOMETHING WENT WRONG")
    }
  }

  const getLatestFitPlan = async () => {
    try {
        const res = await fetch("http://localhost:7707/api/fit-plan/latest", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        })
        const result = await res.json()
        console.log(result)
        console.log(result.plan.weeklyPlan[0].workout)
        setWorkoutPlan(result.plan.weeklyPlan[0].workout)
      } catch (error) {
        console.log(error)
      }
      // console.log(workoutPlan[0].exercises[0].name)
    }
  return (
    <div>
      <h1>WELCOME TO FITGENIE</h1>
      <p>click on the start button to build your plan</p>
      <button onClick={startPlanBuildUp}>Start</button>

      <div className='introduction'>
        <h2><span>Your</span> Fitness Plans</h2>
        {profile && (
          <p>{profile.goal} Plan  <span>{profile.subscription.status}</span></p>
        )}
      </div>

      <div className='workout-wrapper'>
        {profile && (
          <h2><span>PLAN:</span> {profile.goal} plan - {profile.subscription.plan} </h2>
        )}
        {
          workoutPlan.length > 0 ? (
            <div className='workout-con'>
              {
                workoutPlan.map((ele, index) => (
                  <div className='week-data' key={index}>
                      <div className='display-menu' onClick={()=> toggleAccordion(index)}>
                        <h3>{ele.day}</h3>
                        <p>EXERCISES</p>
                      </div>
                      {openIndex === index && (
                        <div className='item-con'>{ele.exercises.map((ele, index) =>(
                          <div className='item-menu' key={index}>
                            <p>{ele.name}</p>
                            <div className='set-rep'>
                              <p>SETS: {ele.sets}</p>
                              <p>REPS: {ele.reps}</p>
                            </div>
                          </div>
                      ))}</div>
                      )}
                  </div>
                ))
              }
            </div>
          ) : (
            <div className='generate-action'>
              <h1>No fitness plan yet</h1>
              <p>Start by creating a personalized fitness and diet plan tailored to your specific goals and needs</p>
              <button onClick={()=> generateFitPlan()}>Create Your First Plan</button>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default DashboardIndex