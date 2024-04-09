import React from 'react'
import './NewsLetter.css'
export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>GET EXCLUSIVE OFFERS ON YOUR EMAIL</h1>
        <p>Subcribe to our newletter and stay updated</p>
        <div>
            <input type='email' placeholder='Your Email id' /> 
            <button>Subcribe</button>
            
        </div>
    </div>
    
  )
}
