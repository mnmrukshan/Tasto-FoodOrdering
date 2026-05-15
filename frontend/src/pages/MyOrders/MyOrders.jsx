import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token,currency} = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data)
  }

  const generateInvoice = (order) => {
    const doc = new jsPDF();
    
    // Header Branding
    doc.setFillColor(18, 18, 18);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(234, 179, 8); // Tasto Gold
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("TASTO", 20, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("Premium Food Delivery", 20, 32);

    // Order Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 55);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 20, 62);
    doc.text(`Status: ${order.status}`, 20, 69);

    // Table Data
    const tableData = order.items.map(item => [
      item.name,
      item.quantity,
      `${currency}${item.price}`,
      `${currency}${item.price * item.quantity}`
    ]);

    autoTable(doc, {
      startY: 80,
      head: [['Item Name', 'Quantity', 'Price', 'Total']],
      body: tableData,
      headStyles: { fillColor: [234, 179, 8], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      margin: { left: 20, right: 20 },
    });

    // Summary Section
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Subtotal:`, 140, finalY);
    doc.text(`${currency}${order.amount - 250}.00`, 175, finalY);
    
    doc.text(`Delivery Fee:`, 140, finalY + 7);
    doc.text(`${currency}250.00`, 175, finalY + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(234, 179, 8);
    doc.text(`Final Total:`, 140, finalY + 15);
    doc.text(`${currency}${order.amount}.00`, 175, finalY + 15);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for choosing Tasto. Enjoy your meal!", 105, 285, { align: 'center' });

    doc.save(`Tasto_Invoice_${order._id.slice(-6)}.pdf`);
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>{currency}{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <div className="order-actions">
                  <button onClick={fetchOrders}>Track Order</button>
                  <button className="invoice-btn" onClick={() => generateInvoice(order)}>Download Receipt</button>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
