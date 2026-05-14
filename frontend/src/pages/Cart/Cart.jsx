import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {

  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount, url, currency, deliveryCharge } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-breadcrumb">
        <p>Home <span>&gt;</span> Cart</p>
      </div>
      <div className="cart-items-container glass-panel">
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-item-card">
                <div className="food-bezel">
                  <img src={typeof item.image === 'string' && (item.image.includes('/') || item.image.startsWith('data:')) ? item.image : url + "/images/" + item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                </div>
                <p className="cart-item-price">{currency}{item.price}</p>
                <div className="quantity-control-pill">
                  <button onClick={() => removeFromCart(item._id)}>–</button>
                  <span>{cartItems[item._id]}</span>
                  <button onClick={() => addToCart(item._id)}>+</button>
                </div>
                <p className="cart-item-total">{currency}{item.price * cartItems[item._id]}</p>
                <p className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)}>✕</p>
              </div>
            )
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total glass-panel">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
            </div>
            <div className="cart-total-details grand-total">
              <b>Total</b>
              <b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode glass-panel">
          <p style={{ color: "rgba(255,255,255,0.6)" }}>If you have a promo code, Enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

