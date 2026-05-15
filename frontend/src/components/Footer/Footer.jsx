import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <div className='footer-logo-container'>
                <svg className="footer-logo-svg" width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FACC15" />
                            <stop offset="100%" stopColor="#FB923C" />
                        </linearGradient>
                        <mask id="footer-logo-mask">
                            <rect x="0" y="0" width="40" height="40" fill="white" />
                            <circle cx="36" cy="4" r="8" fill="black" />
                            <rect x="17" y="24" width="1.5" height="12" rx="1" fill="black" />
                            <rect x="21.5" y="24" width="1.5" height="12" rx="1" fill="black" />
                        </mask>
                    </defs>
                    <path d="M4 8C4 5.79086 5.79086 4 8 4H32C34.2091 4 36 5.79086 36 8V12H24V36H16V12H4V8Z" fill="url(#footer-logo-gradient)" mask="url(#footer-logo-mask)" />
                </svg>
                <span className="footer-logo-text">TASTO</span>
            </div>
            <p>Tasto is dedicated to bringing gourmet flavors straight to your doorstep. We combine fresh ingredients with culinary mastery to elevate your everyday dining experience.</p>
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
                <li>+94 77 975 3864</li>
                <li>hello@tasto.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © Tasto.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
