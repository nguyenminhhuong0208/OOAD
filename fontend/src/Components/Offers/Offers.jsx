import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";
import {useTranslation} from "react-i18next";

const Offers = () => {
  const {t} = useTranslation();

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>{t("Exclusive")}</h1>
        <h1>{t("Offers For You")}</h1>
        <p>{t("Only On Best Seller Productsa")}</p>
        <button>{t("Check Now")}</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
