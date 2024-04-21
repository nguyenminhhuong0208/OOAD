import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.jpg'

const AddProduct = () => {
  return (
    <div className='add-product'>
      {/*ô điền title sản phẩm */}
        <div className="addproduct-itemfield"> 
            <p>Product title</p>
            <input type="text" name='name' placeholder='Type here' />
        </div>
        {/*ô điền giá sản phẩm */}
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" name='old_price' placeholder='Type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name='new_price' placeholder='Type here' />
          </div>
        </div>
        {/*ô chọn loại sản phẩm */}
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select name="category" className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">kid</option>
          </select>
        </div>
        {/*ô upload ảnh sản phẩm */}
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input type="file" name='image' id='file-input' hidden />
        </div>
        <button className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct