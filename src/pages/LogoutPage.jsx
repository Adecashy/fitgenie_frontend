import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const LogoutPage = () => {
    const navigate = useNavigate()
    
    const handleButton = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token);
        
        try {
            const res = await fetch("http://localhost:7707/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data);
            
            if (data.success) {
                toast.error("logout successful")
                localStorage.removeItem("token")
                navigate("/login")
            } else {
                toast.error("no user logged in")
                // navigate("/login")
                return
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='logout-page'>
        <button onClick={handleButton}>Logout</button>
    </div>
  )
}

export default LogoutPage