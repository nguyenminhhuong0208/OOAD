import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom' 
import add_product_icon from '../../assets/cart_icon.png'
import list_product_icon from '../../assets/list_product.jpg'
{/*mục bên trái của giao diện */}
const Sidebar = () => {
  return (
    <div className='sidebar'>
      {/*mục thêm sản phẩm*/}
      <Link to ={'/addproduct'} style={{textDecoration:"none"}}>
        <div  className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      {/*mục xem các sản phẩm hiện có */}
      <Link to ={'/listproduct'} style={{textDecoration:"none"}}>
        <div  className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar