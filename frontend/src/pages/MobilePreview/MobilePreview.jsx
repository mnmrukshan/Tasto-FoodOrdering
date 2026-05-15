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
                    <div className="css-iphone-frame">
                        <div className="dynamic-island"></div>
                        <iframe 
                            src={siteUrl} 
                            title="Tasto Mobile View" 
                            className="mobile-iframe-elite"
                        ></iframe>
                    </div>
                </div>
                
                <div className="preview-info-elite">
                    <h1>Experience<br/>Tasto</h1>
                    <p>Immerse yourself in our world-class gourmet experience, precision-crafted for mobile excellence.</p>
                </div>
            </div>
        </div>
    )
}

export default MobilePreview
