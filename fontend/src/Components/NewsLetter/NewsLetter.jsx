import React from "react";
import "./NewsLetter.css";
import { useTranslation } from "react-i18next";

const NewsLetter = () => {
  const { t } = useTranslation();

  return (
    <div className="newsletter">
      <h1>{t("Get Exclusive Offers On Your Email")}</h1>
      <p>{t("Subscribe to our newsletter and stay updated")}</p>
      <div>
        <input type="email" placeholder={t("Your Email Id")} />
        <button>{t("Subscribe")}</button>
      </div>
    </div>
  );
};

export default NewsLetter;
