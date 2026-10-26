import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const LogoutPage = () => {
    const navigate = useNavigate()
    const API_URL = "https://fitgenie-backend-2izk.onrender.com/api"
    
    const handleButton = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token);
        
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
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
    <div>
        <button onClick={handleButton} className='px-3.5 py-2 rounded-xl cursor-pointer hover:bg-[#b9f65a]/10 hover:text-[#b9f65a]'>Logout</button>
    </div>
  )
}

export default LogoutPage