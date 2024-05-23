import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { useTranslation } from "react-i18next";

const Breadcrum = (props) => {
  const { t } = useTranslation();
  const { product } = props;
  return (
    <div className="breadcrum">
      {t("HOME")} <img src={arrow_icon} alt="" /> {t("SHOP")} <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
