//import React from "react";
import "./RelatedProducts.css";
//import data_product from "../Assets/data";
import Item from "../Item/Item";
import React, { useEffect, useState } from "react";
const RelatedProducts = () => {
  const[new_collection,setNew_collection] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollections') // gọi API
    .then((response)=>response.json()) //chuyển response từ json sang js object
    .then((data)=>setNew_collection(data)); //cập nhật data vừa nhận được
  },[])
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr/>
      <div className="relatedproducts-item">
        {new_collection.map((item, idx) => {
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
