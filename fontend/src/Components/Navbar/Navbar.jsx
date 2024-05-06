import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import {useTranslation} from "react-i18next";
import LanguageSelector from "../Language-selector/language-selector.jsx";

const Navbar = () => {
  const {t} = useTranslation();
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  return (
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="nav-logo" />
          <p>Shopper</p>
        </div>
        <ul className="nav-menu">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              {t("Shop")}
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              {t("Men")}
            </Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
            {t("Women")}
            </Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
            {t("Kids")}
            </Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>{t("Logout")}</button> //nếu đã login rồi thì hiện logout
          :<Link to="/login"><button>{t("Login")}</button></Link>}
          <Link to="/cart">
            <img src={cart_icon} alt="cart-icon" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        <LanguageSelector />
      </div>
  );
};

export default Navbar;