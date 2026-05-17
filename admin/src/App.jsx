import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Dashboard from './pages/Dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {

  const url = "http://localhost:4000";

  return (
    <div className='app-container'>
      <ToastContainer 
        theme="dark" 
        position="bottom-right"
        toastStyle={{ backgroundColor: "#141414", border: "1px solid rgba(234, 179, 8, 0.3)" }}
      />
      <Sidebar />
      <div className="content-area">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/add" />} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
          <Route path="/dashboard" element={<Dashboard url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
