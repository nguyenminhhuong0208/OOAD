import React from 'react'
import './Navbar.css'
import navlogo from "../../assets/logo.png"
import navProfile from "../../assets/Huong.jpg"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='admin-panel'>Admin Panel</div>
        <img src={navlogo} className="nav-logo" />
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar