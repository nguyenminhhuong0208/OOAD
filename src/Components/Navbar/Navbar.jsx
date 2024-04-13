import React, { useContext, useState } from 'react' 
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
// import { Link } from 'react-router-dom'
const Navbar = () =>{
    const [menu,setMenu] = useState("shop") /*Usestate là một hàm có sẵn của react. Cứ đúng công thức mà dùng */
    /*Việc để mỗi cái một class thế này sẽ rất tiện trong việc điều chỉnh css */
    const {getTotalCartItems} = useContext(ShopContext);
    return (
        
        <div className='navbar'>
            <div className='nav-logo'>
                <img src = {logo} alt = "" />
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop" ? <hr/>:<></>}</li> {/*Nếu không có các dòng này thì những gạch đầu dòng sẽ chẳng in ra cái dù*/}
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu==="mens" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu==="womens" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids" ? <hr/>:<></>}</li>
                {/* <li onClick={()=>{setMenu("lolis")}}>Loli{menu==="Lolis" ? <hr/>:<></>}</li> */}
            </ul>
            <div className='nav-login-cart'>
                <button>login</button> {/*Dòng này là nút bấm login */}
                <img src={cart_icon} alt = "" /> {/* Dòng này để show icon cart */}
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    )

}
export default Navbar
/* <li onClick={()=>{setMenu("shop")}}><Link to='/'>shop</Link>{menu==="shop" ? <hr/>:<></>}</li> /*Nếu không có các dòng này thì những gạch đầu dòng sẽ chẳng in ra cái dù*/
                // <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>mens</Link>{menu==="mens" ? <hr/>:<></>}</li>
                // <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>womens</Link>{menu==="womens" ? <hr/>:<></>}</li>
// <li onClick={()=>{setMenu("kids")}}><Link to='kids'>kids</Link>{menu==="kids" ? <hr/>:<></>}</li> */}
/* <Link to="/login"><button>login</button></Link> {/*Dòng này là nút bấm login */
                // <Link to='/cart'><img src={cart_icon} alt = "" /></Link> Dòng này để show icon cart */}