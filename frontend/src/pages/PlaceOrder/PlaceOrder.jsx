import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState(null) // Disabled by default
    const [deliveryData, setDeliveryData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setDeliveryData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        if (!payment) return; // Guard clause

        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item };
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: deliveryData,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }

        try {
            if (payment === "stripe") {
                let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
                if (response.data.success) {
                    const { session_url } = response.data;
                    window.location.replace(session_url);
                }
                else {
                    toast.error("Stripe Session Error")
                }
            }
            else {
                let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
                if (response.data.success) {
                    setCartItems({});
                    toast.success("Order Placed Successfully!")
                    navigate("/myorders", { replace: true })
                }
                else {
                    toast.error("COD Order Error")
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error")
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error("Please sign in to place an order")
            navigate('/cart', { replace: true })
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart', { replace: true })
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order fade-in'>
            <div className="place-order-left glass-panel">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={deliveryData.firstName} placeholder='First name' required autoComplete="off" />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={deliveryData.lastName} placeholder='Last name' required autoComplete="off" />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={deliveryData.email} placeholder='Email address' required autoComplete="off" />
                <input type="text" name='street' onChange={onChangeHandler} value={deliveryData.street} placeholder='Street' required autoComplete="off" />
                <input type="text" name='city' onChange={onChangeHandler} value={deliveryData.city} placeholder='City' required autoComplete="off" />
                <input type="text" name='phone' onChange={onChangeHandler} value={deliveryData.phone} placeholder='Phone' required autoComplete="off" />
            </div>
            
            <div className="place-order-right glass-panel">
                <div className="sidebar-content">
                    <div className="cart-total">
                        <h2>Order Summary</h2>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{currency}{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details grand-total">
                            <b>Total</b>
                            <b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b>
                        </div>
                    </div>
                    
                    <div className="payment">
                        <h2>Payment Method</h2>
                        <div className="payment-options">
                            <div onClick={() => setPayment("cod")} className={`payment-option ${payment === "cod" ? "active" : ""}`}>
                                <div className="radio-circle"></div>
                                <p>Cash on Delivery (COD)</p>
                            </div>
                            <div onClick={() => setPayment("stripe")} className={`payment-option ${payment === "stripe" ? "active" : ""}`}>
                                <div className="radio-circle"></div>
                                <p>Stripe (Credit / Debit Card)</p>
                            </div>
                        </div>
                    </div>
                    
                    <button className={`place-order-submit ${!payment ? "disabled" : ""}`} type='submit' disabled={!payment}>
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
