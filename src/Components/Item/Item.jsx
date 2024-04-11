import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'
export const Item = (props) => {
  return (
    // image product will display here
    <div className='item'>
        {/* product image will be display here */}
        {/* <img src={props.image} alt=""/> */}
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/> </Link>
        <p >{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
        
    </div>
  )
}
export default Item
