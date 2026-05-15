import React, { useState } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

import { QRCodeCanvas } from 'qrcode.react'

const AppDownload = () => {

    const [isHovered, setIsHovered] = useState(false);
    const mobilePreviewUrl = `${window.location.origin}/mobile-preview`;

    const handleQRClick = () => {
        window.open(mobilePreviewUrl, '_blank');
    };

    return (
        <div className='app-download' id='app-download'>
            <div className="app-download-container">
                <div className="app-download-left">
                    <img 
                        src={assets.mobile_mockup} 
                        alt="Smartphone Mockup" 
                        className={`mobile-mockup ${isHovered ? 'mockup-bounce' : ''}`} 
                    />
                </div>
                <div className="app-download-right">
                    <h1>Experience Tasto<br/>on Your Mobile</h1>
                    <p className="app-tagline">
                        Scan the QR code or click below to bring gourmet flavors to your fingertips.
                    </p>
                    
                    <div className="app-download-qr-section">
                        <div 
                            className="qr-wrapper"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleQRClick}
                            data-tooltip="No phone? Click to experience Tasto on our virtual device!"
                        >
                            <div className="qr-container-inner">
                                <QRCodeCanvas
                                    value={mobilePreviewUrl}
                                    size={100}
                                    level={"H"}
                                    includeMargin={false}
                                    imageSettings={{
                                        src: assets.logo,
                                        x: undefined,
                                        y: undefined,
                                        height: 20,
                                        width: 20,
                                        excavate: true,
                                    }}
                                    fgColor="#EAB308"
                                    bgColor="transparent"
                                />
                            </div>
                            <span className="scan-me-text">LAUNCH VIRTUAL MOBILE EXPERIENCE</span>
                        </div>
                        <div className="app-download-platforms">
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
