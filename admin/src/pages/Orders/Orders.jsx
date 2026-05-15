import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error("Error fetching orders")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const response = await axios.post(url + "/api/order/remove", { orderId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error("Error deleting order");
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Food Processing': return '#EAB308';
      case 'Out for Delivery': return '#F97316';
      case 'Delivered': return '#22C55E';
      default: return '#ffffff';
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add fade-in'>
      <div className="order-container glass-panel">
        <h2 className='page-title'>Order Management</h2>
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className='order-item glass-panel'>
              <img src={assets?.parcel_icon || ""} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, i) => (
                    i === order.items.length - 1 
                    ? `${item.name} x ${item.quantity}` 
                    : `${item.name} x ${item.quantity}, `
                  ))}
                </p>
                <p className='order-item-name'>{`${order.address.firstName} ${order.address.lastName}`}</p>
                <div className='order-item-address'>
                  <p>{[order.address.street, order.address.city, order.address.state, order.address.country].filter(Boolean).join(', ')}</p>
                  <p>{order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs. {order.amount}</p>
              <div className="order-actions">
                <div className="status-container">
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(order.status) }}></span>
                  <select 
                    onChange={(event) => statusHandler(event, order._id)} 
                    value={order.status}
                    style={{ color: getStatusColor(order.status), borderColor: getStatusColor(order.status) + '4D' }}
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button className='delete-order-btn' onClick={() => deleteOrder(order._id)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
