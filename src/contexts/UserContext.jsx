import { createContext, useState } from "react"

export const userContext = createContext()

const UserProvider = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [profile, setProfile] = useState()

    const getUserProfile = async () => {
        try {
            const res = await fetch(`http://localhost:7707/api/users/my-profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await res.json()
            // console.log(result);

            setProfile(result)
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        profile,
        getUserProfile
    }

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}

export default UserProvider