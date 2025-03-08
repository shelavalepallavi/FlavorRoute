import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

      <div className="footer-content">
        <div className="footer-content-left">
          <p className='logo'>FlavorRoute</p>
          <p>This application  typically offers recipes, cooking tips, and meal planning ideas. It may include sections for different cuisines, dietary preferences, and seasonal dishes. Users can find detailed instructions, ingredient lists, and nutritional information.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-123-456-7890</li>
            <li>contact@flavorroute.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className='footer-copyright'>Copyright 2024 &copy; FlavorRoute.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
