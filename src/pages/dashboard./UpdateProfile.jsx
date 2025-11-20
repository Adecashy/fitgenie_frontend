import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { userContext } from '../../contexts/UserContext'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const token = JSON.parse(localStorage.getItem("token"))

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup.number().required("Age is required"),
    gender: yup.string().required("Gender is required").oneOf(["male", "female"]),
    height: yup.number().required("Height is required"),
    weight: yup.number().required("Weight is required"),
    goal: yup.string().required("Goal is required").oneOf(["weight loss", "weight gain"]),
    dietPreference: yup.string().required("Diet Preference is required").oneOf(["vegetarian", "balanced", "vegan", "high_protein", "gluten_free", "none"]),
    timePerDay: yup.number().required("Time per day is required"),
    activityLevel: yup.string().required("Activity Level is required").oneOf(["light", "sedentary", "moderate", "active"]),
})

const UpdateProfile = () => {
    const { profile, getUserProfile } = useContext(userContext)
    const navigate = useNavigate()
    
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: profile?.name || "",
            age: null,
            gender: "",
            height: null,
            weight: null,
            goal: "",
            dietPreference: "",
            timePerDay: null,
            activityLevel: "",
        }
    })
    const [submitting, setSubmitting] = useState(false)
    useEffect(()=> {
       getUserProfile()
    },[])
    useEffect(()=> {

        if(profile){
            setValue("name", profile?.name)
            setValue("age", profile?.age)
            setValue("gender", profile?.gender)
            setValue("height", profile?.height)
            setValue("weight", profile?.weight)
            setValue("goal", profile?.goal)
            setValue("dietPreference", profile?.dietPreference)
            setValue("timePerDay", profile?.timePerDay)
            setValue("activityLevel", profile?.activityLevel)
        }
    },[profile])

    // console.log(profile)
    
    

    const onSubmit = async (data) =>{
        setSubmitting(true)
        try {
            const res = await fetch(`http://localhost:7707/api/users/${profile._id}/profile`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            
            const result = await res.json()
            console.log(result);
            
            if (!result.success) {
                throw new Error(result.message || "failed to update profile")
            }
            if (result.success) {
                toast.success("Profile updated successfully!")
                reset(result.updatedUser)
                navigate("/dashboard/profile")
            }
            // console.log("profile updated:", result)
        } catch (error) {
            console.log(error);
            toast.error(error.message || "failed to update profile")
        } finally {
            setSubmitting(false)
        }
    }
  return (
    <div className="update-container">
      <h2 className="update-title">Update Profile</h2>

      <form className="update-form" onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input id="name" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Age */}
        <div className="form-row">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" {...register("age", { required: "Age is required" })} />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div className="form-row">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register("gender")}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        {/* Height */}
        <div className="form-row">
          <label htmlFor="height">Height (cm):</label>
          <input type="number" id="height" {...register("height")} />
          {errors.height && <p className="error">{errors.height.message}</p>}
        </div>

        {/* Weight */}
        <div className="form-row">
          <label htmlFor="weight">Weight (kg):</label>
          <input type="number" id="weight" {...register("weight")} />
          {errors.weight && <p className="error">{errors.weight.message}</p>}
        </div>

        {/* Goal */}
        <div className="form-row">
          <label htmlFor="goal">Goal:</label>
          <select id="goal" {...register("goal")}>
            <option value="">Select Goal</option>
            <option value="weight loss">Weight Loss</option>
            <option value="weight gain">Weight Gain</option>
          </select>
          {errors.goal && <p className="error">{errors.goal.message}</p>}
        </div>

        {/* Diet Preferences */}
        <div className="form-row">
          <label htmlFor="dietPreference">Diet Preferences:</label>
          <select id="dietPreference" {...register("dietPreference")}>
            <option value="">Select Diet Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="balanced">Balanced</option>
            <option value="vegan">Vegan</option>
            <option value="high_protein">High Protein</option>
            <option value="gluten_free">Gluten Free</option>
            <option value="none">None</option>
          </select>
          {errors.dietPreference && <p className="error">{errors.dietPreference.message}</p>}
        </div>

        {/* Time Per Day */}
        <div className="form-row">
          <label htmlFor="timePerDay">Time Per Day (minutes):</label>
          <input type="number" id="timePerDay" {...register("timePerDay")} />
          {errors.timePerDay && <p className="error">{errors.timePerDay.message}</p>}
        </div>

        {/* Activity Level */}
        <div className="form-row">
          <label htmlFor="activityLevel">Activity Level:</label>
          <select id="activityLevel" {...register("activityLevel")}>
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
          {errors.activityLevel && <p className="error">{errors.activityLevel.message}</p>}
        </div>

        <button disabled={submitting} className="update-btn">Update Profile</button>
      </form>
    </div>
  )
}

export default UpdateProfile