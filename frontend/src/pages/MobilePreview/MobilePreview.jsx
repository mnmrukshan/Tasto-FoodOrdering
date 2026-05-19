import React from 'react'
import './MobilePreview.css'
import { assets } from '../../assets/assets'

const MobilePreview = () => {
    // Using the same URL as the current site
    const siteUrl = window.location.origin;

    return (
        <div className='mobile-preview-page'>
            <button onClick={() => window.close()} className="close-preview-btn-top">Close Preview</button>
            
            <div className="preview-container">
                <div className="iphone-mockup-elite">
                    <div className="phone-bezel">
                        <div className="phone-side-button volume-up"></div>
                        <div className="phone-side-button volume-down"></div>
                        <div className="phone-side-button power"></div>
                        <div className="phone-inner-frame">
                            <div className="phone-dynamic-island">
                                <div className="camera-lens"></div>
                            </div>
                            <div className="phone-screen">
                                <iframe 
                                    src={siteUrl} 
                                    title="Tasto Mobile View" 
                                    className="phone-iframe-screentime"
                                ></iframe>
                            </div>
                            <div className="phone-reflection"></div>
                        </div>
                    </div>
                </div>
                
                <div className="preview-info-elite">
                    <h1>Experience<br/>Tasto</h1>
                    <p>Immerse yourself in world-class gourmet flavors. Precision-crafted for a seamless mobile ordering experience.</p>
                </div>
            </div>
        </div>
    )
}

export default MobilePreview
