import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import axios from 'axios';
import Item from "../Item/Item";

const RelatedProducts = (props) => {
  const [newCollection, setNewCollection] = useState([]);
  const [fullProduct, setFullProduct] = useState([]);
  const { product } = props;
  const userName = localStorage.getItem('name');

  useEffect(() => {
    if (product && userName) {
      fetchRecommendations();
    }
  }, [product, userName]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:4040/recommend', {
        params: { item_name: product.name, user_name: userName }
      });
      const recommendations = response.data.recommendations;
      setNewCollection(recommendations);
      fetchProduct(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const fetchProduct = async (list) => {
    const product = []
    for (let i = 0; i < list.length; i++) {
      const response = await axios.get(`http://localhost:4000/getproductbyname?name=${list[i]}`);
      if (response.status === 200) {
          product.push(response.data.data)
      } else {
          console.log("Can not find item")
      }
  }
  setFullProduct(product)
  };

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {fullProduct.length > 0 ? (
          fullProduct.map((item, idx) => (
            <Item
              key={idx}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
