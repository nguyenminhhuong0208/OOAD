import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import  DescriptionBox  from '../Components/DescriptionBox/DescriptionBox'
import  RelatedProducts  from '../Components/RelatedProducts/RelatedProducts'


const Product = () => {
  
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id===Number(productId)); // string convert to number

  return (
    <div>
      {/* phần breadcum là phần mà HOME > SHOP > Women... */}
      {/* Phần description box đã nói trong file description box.jsx */}
      {/*Phần related product là phần ở bên dưới description box */}
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts product={product} />
    </div>
  )
}
export default Product

