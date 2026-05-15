import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard fade-in'>
      <div className="dashboard-container glass-panel">
        <h2 className='page-title'>Admin Dashboard</h2>
        <div className="welcome-section">
            <h3>Welcome back, Admin!</h3>
            <p>Manage your food items and track orders in real-time.</p>
        </div>
        <div className="stats-grid">
            <div className="stat-card glass-panel">
                <h3>Total Orders</h3>
                <p>128</p>
            </div>
            <div className="stat-card glass-panel">
                <h3>Total Revenue</h3>
                <p>Rs. 45,000</p>
            </div>
            <div className="stat-card glass-panel">
                <h3>Active Items</h3>
                <p>32</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
