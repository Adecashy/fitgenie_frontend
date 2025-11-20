import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from "yup"

const signupSchema = yup.object({
    email: yup.string().required("email is required").email("kindly enter a valid email"),
    name: yup.string().required("name is required"),
    gender: yup.string().oneOf(["male", "female"]).required("gender is required"),
    password: yup.string().required("password is required").min(6, "password must be at least 6 characters")
})

const SignupPage = () => {
    const navigate = useNavigate()
    const [submitting, setSubmitting ] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            email: "",
            name: "",
            gender: "",
            password: ""
        }
    })

    const onSubmit = async (inputValue) => {
        setSubmitting(true)
        try {
            const res = await fetch("http://localhost:7707/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(inputValue),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await res.json()
            if (result.success) {
                toast.success(result.message || "Registration successful")
                navigate("/login")
            } else {
                toast.error(result.message || "something went wrong")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <div className='container-body'>
        <div className='container-child'>
            <div className='signup-page'>
                <div className='header'>
                    <h1>REGISTER</h1>
                </div>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="text" id='name' {...register("name")} placeholder='Name' />
                        {errors.name && <h5 className="error-msg">{errors.name.message}</h5>}
                    </div>
                    <div>
                        <input type="email" id='email' {...register("email")} placeholder='Email' />
                        {errors.email && <h5 className="error-msg">{errors.email.message}</h5>}
                    </div>
                    <div>
                        <input type="text" id='gender' {...register("gender")} placeholder='Gender' />
                        {errors.gender && <h5 className="error-msg">{errors.gender.message}</h5>}
                    </div>
                    <div>
                        <input type="password" id='password' {...register("password")} placeholder='Password' />
                        {errors.password && <h5 className="error-msg">{errors.password.message}</h5>}
                    </div>
                    <span><button disabled={submitting}>Create Account</button></span>
                    <p>Already have an account? <Link to="/login" className='gotologin'>Login</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignupPage