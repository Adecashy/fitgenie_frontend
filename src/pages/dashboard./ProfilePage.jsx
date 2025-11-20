import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../contexts/UserContext'

const ProfilePage = () => {
    const navigate = useNavigate()
    
    const { profile, getUserProfile } = useContext(userContext)

    useEffect(()=> {
        getUserProfile()
    },[])

    const goToUpdateProfile = () => {
        navigate("/dashboard/update-profile")
    }

  return (
    <div>
        <section>
            { profile && (
                <div className="profile-container">
                  <h2 className="profile-title">User Profile</h2>

                  <div className="profile-info">
                    <div className="info-item">
                      <span className="label">Name:</span>
                      <span className="value">{profile.name}</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Email:</span>
                      <span className="value">{profile.email}</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Age:</span>
                      <span className="value">{profile.age}</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Gender:</span>
                      <span className="value">{profile.gender}</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Height:</span>
                      <span className="value">{profile.height} cm</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Weight:</span>
                      <span className="value">{profile.weight} kg</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Goal:</span>
                      <span className="value">{profile.goal}</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Diet Preferences:</span>
                      <span className="value">{profile.dietPreference}</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Time Per Day:</span>
                      <span className="value">{profile.timePerDay} minutes</span>
                    </div>

                    <div className="info-item">
                      <span className="label">Activity Level:</span>
                      <span className="value">{profile.activityLevel}</span>
                    </div>
                  </div>

                  <button className="edit-btn" onClick={goToUpdateProfile}>
                    Enter to update Profile
                  </button>
                </div>
            )
            }
        </section>
    </div>
  )
}

export default ProfilePage