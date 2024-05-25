import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./OrderSummary.css"; // Tạo file CSS để định kiểu cho OrderSummary
import { Navigate } from 'react-router-dom'; // mới thêm

const OrderSummary = () => {
  const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);

  const totalItems = all_product.reduce((total, product) => {
    return total + (cartItems[product.id] || 0);
  }, 0);

  const handleBuy = () => {
    // alert("Purchase complete!");
    Navigate('/rating', { purchasedItems: cartItems });
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <div>
        <div className="order-summary-products">
          {all_product.map((e, idx) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={idx} className="cartitems-format cartitems-format-main">
                  <img src={e.image} alt="" className="carticon-product-icon" />
                  <p className="product-title">{e.name}</p>
                  <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="cartitems-total">
          <h1>Order Summary</h1>
          <div className="order-summary-details">
            <p className="cartitems-total-item">Total Items: {totalItems}</p>
            <p className="cartitems-total-item">Shipping & handling: Free</p>
            <p className="cartitems-total-item">Total before: ${getTotalCartAmount()}</p>
            <p className="cartitems-total-item">Order total: ${getTotalCartAmount()}</p>
          </div>
          <button className="buy-button" onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
  
};

export default OrderSummary;
