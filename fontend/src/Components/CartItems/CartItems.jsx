import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import {useTranslation} from "react-i18next";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const {t} = useTranslation();

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>{t("Products")}</p>
        <p>{t("Title")}</p>
        <p>{t("Price")}</p>
        <p>{t("Quantity")}</p>
        <p>{t("Total")}</p>
        <p>{t("Remove")}</p>
      </div>
      <hr />

      {all_product.map((e, idx) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={idx}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}
{/*phần mô tả phía dưới của giỏ hàng*/}
         <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>{t("Cart Totals")}</h1>
                <div>
                    {/*tổng sản phẩm trong giỏ hàng*/}
                    <div className="cartitems-total-item">
                        <p>{t("Subtotal")}</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>{t("Shipping Fee")}</p>
                        <p>{t("Free")}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>{t("Total")}</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                {/*checkout*/}
                <button>{t("PROCEED TO CHECKOUT")}</button>
            </div>
            {/*ô điền mã giảm giá*/}
            <div className="cartitems-promocode">
                <p>{t("If you have promo code, Enter it here")}</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder={t("Promo code")} />
                    <button>{t("Submit")}</button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default CartItems