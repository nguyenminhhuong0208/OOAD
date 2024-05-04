import React, { useEffect, useState } from "react";
import "./NewCollections.css";
//import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";
import {useTranslation} from "react-i18next";

const NewCollections = () => {
  const[new_collection,setNew_collection] = useState([]);
  const {t} = useTranslation();
  useEffect(()=>{
    fetch('http://localhost:4000/newcollections') // gọi API
    .then((response)=>response.json()) //chuyển response từ json sang js object
    .then((data)=>setNew_collection(data)); //cập nhật data vừa nhận được
  },[])
  return (
    <div className="new-collections">
      <h1>{t("NEW COLLECTIONS")}</h1>
      <hr />
      <div className="collections">
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

export default NewCollections;
