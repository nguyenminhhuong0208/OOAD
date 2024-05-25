import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product'
import  Footer  from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import SearchBar from './Components/Search/SearchBar'
import OrderSummary from './Components/OrderSummary/OrderSummary'
import UserProfile from './Components/UserProfile/UserProfile'
function App() {
  const [results, setResult] = useState([]);
  return (
    <div>       
      <BrowserRouter>
      <Navbar/>
      {/* <SearchBar setResult={setResult}/>
      <SearchResultList results={results}/> */}
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/> } />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} /> 
        <Route path='/product' element={<Product/>} >
          <Route path = ':productId' element={<Product/>} /> 
        </Route>
        
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order-summary' element={<OrderSummary />} /> {/* Chỉnh sửa từ component sang element */}
        <Route path='/login' element={<LoginSignup/>} />
        <Route path='/search' element={<SearchBar setResult={setResult} result={results}/>}/>
        <Route path='/UserProfile' element={<UserProfile />}/>
        
      </Routes> 
      
      <Footer/>
      
        
      
       </BrowserRouter>
    </div>
    
  );
}
// function Json() {
//   return <>{JSON.stringify(data)}</>;
// }
export default App;