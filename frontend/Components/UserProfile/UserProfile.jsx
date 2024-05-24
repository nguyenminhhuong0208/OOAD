import './UserProfile.css'
import React from 'react'

const UserProfile = () => {
    return (
       <div className='mainFrame'>
        <div className='User-anh-bia'>
        hello world
        </div>
        <input className = "username" type="text" placeholder='Username' />
        <input className = "email" type="text" placeholder='User Email' />
        <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Total</p>
            <p>Rating</p>
            </div>
        </div>
       </div>
       
       
    )
}
export default UserProfile