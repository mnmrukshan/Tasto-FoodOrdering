import React, { useState } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {

    const [isHovered, setIsHovered] = useState(false);
    const mobilePreviewUrl = `${window.location.origin}/mobile-preview`;

    const handleQRClick = () => {
        window.open(mobilePreviewUrl, '_blank');
    };

    // Prevent infinite recursive iframe loading loops when rendering the homepage inside an iframe
    const isInsideIframe = (() => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    })();

    if (isInsideIframe) {
        return null;
    }

    return (
        <div className='app-download' id='app-download'>
            <div className="app-download-container">
                <div className="app-download-left">
                    <div 
                        className={`premium-phone-mockup ${isHovered ? 'mockup-active' : ''}`}
                        onClick={handleQRClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        title="Click to launch interactive mobile preview"
                    >
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
                                        src="/" 
                                        title="Tasto App Live" 
                                        className="phone-iframe-screentime"
                                    ></iframe>
                                </div>
                                <div className="phone-reflection"></div>
                            </div>
                        </div>
                        <div className="phone-shadow"></div>
                    </div>
                </div>
                <div className="app-download-right">
                    <span className="premium-badge">VIRTUAL PREVIEW</span>
                    <h1>Virtual Mobile<br/>Experience</h1>
                    <p className="app-tagline">
                        No physical device needed. Step into a fully interactive mobile showcase of Tasto. Browse our complete menu, experience real-time ordering, and discover gourmet flavors with responsive mobile layouts.
                    </p>
                    
                    <div className="cta-wrapper">
                        <button 
                            className="premium-cta-btn" 
                            onClick={handleQRClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className="btn-glow"></span>
                            <span className="btn-text">Launch Now</span>
                        </button>
                    </div>

                    <div className="app-download-platforms">
                        <span className="platforms-title">Also available on native platforms</span>
                        <div className="store-buttons-container">
                            <img src={assets.play_store} alt="Google Play" className="store-btn" />
                            <img src={assets.app_store} alt="App Store" className="store-btn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppDownload
