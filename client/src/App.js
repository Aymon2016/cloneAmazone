import React from 'react';
import './App.css'
import {Routes,Route} from 'react-router-dom'

import Navbar from './component/header/navbar';
import Maincomp from './component/home/Maincomponent';
import Newnav from './component/newnavbar/Newnav';
import Footer from './component/footer/Footer';
import Signin from './component/sign_signup/Signin';
import Signup from './component/sign_signup/Signup';
import Cart from './component/cart/Cart';
import BuyNow from './component/buynow/BuyNow';


function App() {
  return (
    <div className="App">
     <Navbar></Navbar>
     <Newnav></Newnav>
     <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<BuyNow />} />
     </Routes>
     <Footer></Footer>
    </div>
  );
}

export default App;
