import { createContext, useState } from "react"

const API_URL = "https://fitgenie-backend-2izk.onrender.com/api"

export const userContext = createContext()

const UserProvider = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [profile, setProfile] = useState()
    const [profileLoading, setProfileLoading] = useState(false)

    const getUserProfile = async () => {
        setProfileLoading(true)
        try {
            const res = await fetch(`${API_URL}/users/my-profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message || "unable to load profile")
            }

            setProfile(result)
            return result
        } catch (error) {
            console.log(error);
            return null
        } finally {
            setProfileLoading(false)
        }
    }

    const value = {
        profile,
        profileLoading,
        getUserProfile
    }

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}

export default UserProvider