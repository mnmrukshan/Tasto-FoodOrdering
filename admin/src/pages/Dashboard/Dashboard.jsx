import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeItems: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const [statsRes, foodRes] = await Promise.all([
        axios.get(url + "/api/order/dashboard-stats"),
        axios.get(url + "/api/food/list")
      ]);

      let ordersStats = { totalOrders: 0, totalRevenue: 0 };
      let activeItemsCount = 0;

      if (statsRes.data.success) {
        ordersStats = statsRes.data.data;
      } else {
        toast.error("Failed to fetch dashboard stats");
      }

      if (foodRes.data.success) {
        activeItemsCount = foodRes.data.data.length;
      } else {
        toast.error("Failed to fetch food items");
      }

      setStats({
        totalOrders: ordersStats.totalOrders,
        totalRevenue: ordersStats.totalRevenue,
        activeItems: activeItemsCount
      });
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardStats();
  }, []);

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
                <p>{loading ? "..." : stats.totalOrders}</p>
            </div>
            <div className="stat-card glass-panel">
                <h3>Total Revenue</h3>
                <p>Rs. {loading ? "..." : stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="stat-card glass-panel">
                <h3>Active Items</h3>
                <p>{loading ? "..." : stats.activeItems}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
