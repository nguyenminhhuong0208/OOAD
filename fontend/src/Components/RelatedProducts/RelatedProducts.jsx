import React from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";
import { useTranslation } from "react-i18next";

const RelatedProducts = () => {
  const { t } = useTranslation();

  return (
    <div className="relatedproducts">
      <h1>{t("Related Products")}</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, idx) => {
          return (
            <Item
              key={idx}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
