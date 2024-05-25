// import React, { createContext, useEffect, useState } from 'react';
// //import all_product from "../Components/Assets/all_product";
// //import CartItems from '../Components/CartItems/CartItems';

// import axios from 'axios';
// export const ShopContext = createContext(null);
// const getDefaultCart = ()=>{
//     let cart = {};
//     for (let index = 0; index < 300+1; index++) { //đổi all_product.length thành 300
//         cart[index] = 0;
//     }
//     return cart;
// }
// const ShopContextProvider = (props)=>{
//     const [all_product,setAll_Product]= useState([]);
//     // can access cartItems data in any component
//     const [cartItems,setCartItems] = useState(getDefaultCart());
//     const [username, setUsername] = useState(""); // State để lưu trữ tên người dùng
//     useEffect(() => {
//         // Gọi API để lấy thông tin người dùng từ cơ sở dữ liệu
//         async function fetchUserData() {
//             try {
//                 const response = await axios.get('http://localhost:4000/user'); // Đổi '/api/user' thành endpoint của bạn
//                 setUsername(response.data.username);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 // Xử lý lỗi tại đây
//             }
//         }

//         fetchUserData(); // Gọi hàm để lấy thông tin người dùng khi component được render

//     }, []); // Chạy một lần khi component được render



//     useEffect(()=>{
//         fetch('http://localhost:4000/allproducts') //load product từ backend
//         .then((response)=>response.json())
//         .then((data)=>setAll_Product(data))

//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/getcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:"",
//             }).then((response)=>response.json())
//             .then((data)=>setCartItems(data));
//         }
//     },[])
    
//     //console.log(cartItems);
//     const addToCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         //console.log(cartItems); bỏ console đi thay bằng
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/addtocart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=>console.log(data));
//         }
//     }
//     const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
//         if(localStorage.getItem('auth-token')){ //kết nối với database backend
//             fetch('http://localhost:4000/removefromcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=>console.log(data));
//         }
//     }
//     {/*tính tổng giá các sản phẩm trong giỏ hàng */}
//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if(cartItems[item] > 0)
//             {
//                 let itemInfo = all_product.find((product)=>product.id===Number(item))
//                 totalAmount += itemInfo.new_price * cartItems[item];
//             }   
//         }
//         return totalAmount;
//     }
//     {/*hiển thị số sản phẩm trên biểu tượng giỏ hàng */}
//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for(const item in cartItems){
//             if(cartItems[item] > 0)
//             {
//                 totalItem += cartItems[item];
//             }
            
//         }
//         return totalItem;
//     }

//     const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,username};

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;
import React, { createContext, useEffect, useState } from 'react';
//import all_product from "../Components/Assets/all_product";
//import CartItems from '../Components/CartItems/CartItems';
import axios from 'axios';
// const jwt = require('jsonwebtoken');

export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) { //đổi all_product.length thành 300
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props)=>{
    const [all_product,setAll_Product]= useState([]);
    // can access cartItems data in any component
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [username, setUsername] = useState(""); // State để lưu trữ tên người dùng

    // useEffect(()=>{
    //     // Các thao tác khác trong useEffect
        
    //     // Lấy tên người dùng từ localStorage sau khi đăng nhập thành công
    //     const token = localStorage.getItem('auth-token');
    //     if (token) {
    //         const decodedToken = jwt.decode(token);
    //         if (decodedToken && decodedToken.user && decodedToken.user.name) {
    //             setUsername(decodedToken.user.name);
    //         }
    //     }
    // }, []);
    useEffect(() => {
        // Gọi API để lấy thông tin người dùng từ cơ sở dữ liệu
        async function fetchUserData() {
            try {
                const response = await axios.get('http://localhost:4000/user'); // Đổi '/api/user' thành endpoint của bạn
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Xử lý lỗi tại đây
            }
        }

        fetchUserData(); // Gọi hàm để lấy thông tin người dùng khi component được render

    }, []); // Chạy một lần khi component được render

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts') //load product từ backend
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    
    //console.log(cartItems);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ 
            ...prev, 
            [itemId]: (prev[itemId] || 0) + 1 
        }));
    
        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', // Changed to 'application/json'
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Item added to cart:', data);
            })
            .catch((error) => {
                console.error('Error adding item to cart:', error);
            });
        } else {
            console.error('No auth-token found in localStorage');
        }
    };
    // const addToCart = (itemId) => {
    //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    //     //console.log(cartItems); bỏ console đi thay bằng
    //     if(localStorage.getItem('auth-token')){
    //         fetch('http://localhost:4000/addtocart',{
    //             method:'POST',
    //             headers:{
    //                 Accept:'application/form-data',
    //                 'auth-token':`${localStorage.getItem('auth-token')}`,
    //                 'Content-Type':'application/json',
    //             },
    //             body:JSON.stringify({"itemId":itemId}),
    //         })
    //         .then((response)=>response.json())
    //         .then((data)=>console.log(data));
    //     }
    // }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
        if(localStorage.getItem('auth-token')){ //kết nối với database backend
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    {/*tính tổng giá các sản phẩm trong giỏ hàng */}
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }   
        }
        return totalAmount;
    }
    {/*hiển thị số sản phẩm trên biểu tượng giỏ hàng */}
    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0)
            {
                totalItem += cartItems[item];
            }
            
        }
        return totalItem;
    }
    

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,username};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;