import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import all_product from "../Assets/all_product.js";

// Làm cái cart items nhớ để ý từng dấu viết hoa và không viết hoa
// Đức đã mất rất lâu để fix bug kiểu này
const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart } = useContext(ShopContext);
    //console.log(all_product);
    // Hiện tại trong cái all_product.map không chạy, vì thế nó không hiện ra hình ảnh như trong vid (hình ảnh của page cart. Tìm cách trích xuất data từ all_product để tìm hiểu xem sao)
    // anh đang tìm cách nhìn all_product có gì và trích xuất data của nó
    // let temp = all_product[0];
    // console.log(temp[id]);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id] >= 0)
            {
                console.log(cartItems[e.id]);
                return(
                    <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button> {/*display product quantity */}
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>removeFromCart(e.id)}/>
                        </div>
                    </div>
                )
            }
            return null;
        })}
{/*phần mô tả phía dưới của giỏ hàng*/}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    {/*tổng sản phẩm trong giỏ hàng*/}
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                {/*checkout*/}
                <button>PROCEED TO CHECKOUT</button>
            </div>
            {/*ô điền mã giảm giá*/}
            <div className="cartitems-promocode">
                <p>If you have promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default CartItems
