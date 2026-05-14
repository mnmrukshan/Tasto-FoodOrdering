import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc , id }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={typeof image === 'string' && (image.includes('/') || image.startsWith('data:')) ? image : url+"/images/"+image} alt="" />
                {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                        <button className="counter-btn" onClick={()=>removeFromCart(id)}>-</button>
                        <p>{cartItems[id]}</p>
                        <button className="counter-btn" onClick={()=>addToCart(id)}>+</button>
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p style={{ textTransform: 'capitalize' }}>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem
