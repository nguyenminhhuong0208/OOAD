import React from 'react'
import './DescriptionBox.css'

// file này là để viết về description box (sau khi bấm vào sản phẩm, kéo xuống dưới sẽ thấy description box)
export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
                hello askdhfkjashdfkjaskdjflhaslkdjfhkalshdfkjashkdjfhkasjhd
                asldfjkasdfkjahskjdfhasd
                asdfkjashdfjkhaskjdfhkjasdkfkajsdfhkjas
                asldflkasjdfljaskdfjklas
            </p>
            <p>
                askjfhdkjashdflkjaslkjdfkasjhdflkaskdjfalskdhflkash
                kjasfhdlkjasdkfhlaskjfhklashdfkj;
                kasdhfkjlashldfjkaslkdfaskdfjlakds
            </p>
        </div>
    </div>
 )
}
