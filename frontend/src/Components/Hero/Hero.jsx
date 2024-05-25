import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import top_model_image from '../Assets/Home_page_top_image.png'
export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <div className='hero-left-text'>
                <h1>New </h1>
                <h1>Collections </h1>
                <h1>For everyone</h1>
                {/* text for our webpage */}
                <p>Looking for clothes that express your unique style? </p>
                    <p>Welcome to Huong's shop, your one-stop shop for curated fashion finds! </p>
                    <p>We offer a diverse selection of clothing for every occasion, from trendy must-haves to timeless staples</p>
                    <p>Whether you're rocking a bold look or keeping it classic, we've got something for you. </p>
                        <p>Browse our collections and discover your new favorite outfit today!</p>
            </div>
            <div className="hero-latest-button">
                <div>Latest Collection</div>
                <img src={arrow_icon}></img>
            </div>
        </div>
        <div className="hero-right">
            <img src={top_model_image} alt=""></img>
        </div>
    </div>
    
  )
}
export default Hero
