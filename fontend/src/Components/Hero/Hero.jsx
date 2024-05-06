import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import {useTranslation} from "react-i18next";

const Hero = () => {

  const {t} = useTranslation();

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>{t("New Arrivals Only")}</h2>
        <div>
          <div className="hero-hand-icon">
            <p>{t("New")}</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>{t("collections")}</p>
          <p>{t("for everyone")}</p>
        </div>
        <div className="hero-latest-btn">
          <div>{t("Latest Collection")}</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
