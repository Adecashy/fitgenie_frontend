import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from "yup"

const loginSchema = yup.object({
    email: yup.string().required("kindly enter a valid email"),
    password: yup.string().required("kindly enter a valid password")
})

const LoginPage = () => {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (inputValue) => {
        setSubmitting(true)
        try {
            const res = await fetch("http://localhost:7707/api/auth/login", {
                method: "POST",
                body: JSON.stringify(inputValue),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await res.json()
            if (result.success) {
                toast.success(result.message || "login successful")
                navigate("/dashboard")
            } else {
                toast.error(result.message || "something went wrong")
            }
            localStorage.setItem("token", JSON.stringify(result.token))
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <div className='container-body'>
        <div className='container-child'>
            <div className='login-page'>
                <div className='header'>
                    <h1>LOGIN</h1>
                </div>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="email" id='email' {...register("email")} placeholder='Email' />
                        {errors.email && <h5 className="error-msg">{errors.email.message}</h5>}
                    </div>
                    <div>
                        <input type="password" id='name' {...register("password")} placeholder='Password' />
                        {errors.password && <h5 className="error-msg">{errors.password.message}</h5>}
                    </div>
                    <span className='login-btn'><button disabled={submitting}>Login</button></span>
                    <p>Don't have an account? <Link to="/signup" className='gotologin'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage