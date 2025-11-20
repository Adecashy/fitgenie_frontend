import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const defaultMenuItems = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Products",
        path: "/products"
    },
    {
        label: "Help",
        path: "/help"
    },
    {
        label: "About Us",
        path: "/about-us"
    }
]

const Navbar = ({ menuItems = defaultMenuItems }) => {
    const navigate = useNavigate()
    const gotoSignup = () => {
        navigate("/signup")
    }

    const gotoLogin = () => {
        navigate("/login")
    }

  return (
    <div className='nav'>
        <Link className='logo' to="/"><h2>Fit<span>Genie</span></h2></Link>
        <div className='menuItems'>
            {
                menuItems.map((item, index) => (
                    <Link className='menu' to={item.path} key={index}>{item.label}</Link>
                ))
            }
        </div>
        <div className='userNav'>
            <button className='login' onClick={gotoLogin}>Login</button>
            <button className='signup' onClick={gotoSignup}>Sign-Up</button>
        </div>
    </div>
  )
}

export default Navbar