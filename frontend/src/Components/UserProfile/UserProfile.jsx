import './UserProfile.css'
import React from 'react'

const UserProfile = () => {
    const userName = localStorage.getItem('name');
    
    return (
       <div className='mainFrame'>
        <div className='User-anh-bia'>
        <div className='avatar'></div>
        </div>
        <input className = "username" type="text" placeholder='Username'  value={userName}/>
        
        <div className="cartitems">
        
        </div>
       </div>
       
       
    )
}
export default UserProfile