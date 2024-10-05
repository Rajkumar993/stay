import './Assets/Styles/App.css';
import Navbar from './Navbar';
import "semantic-ui-css/semantic.min.css";
import '@mui/material/styles';
import Shop from './Components/Shop';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import {Cart} from './Components/Cart';
import Loading from './Loading';
import Contact from './Components/Contact';
import OurStory from './Components/OurStory';
import Footer from './Footer';
import BestSeller from './Components/BestSeller';
import Product from './Product';
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import client from './apolloClient';
import About from './Components/About';
import Brands from './Components/Brands';
import Order from './Components/Order';
import TermsAndConditions from './Footer/TermsAndCondition';
import PrivactPolicy from './Footer/PrivacyPolicy';
import Blogs from './Components/Blogs';
import Category from './Components/Category';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import ReactGA from 'react-ga';
import CancellationAndRefund from './Footer/CancellationAndRefund';
import { DOMAIN } from "./env";
import { SHOP_ID } from './env';
import { Input } from 'semantic-ui-react'
import SearchProduct from './Components/SearchProduct';
import { Link } from "react-router-dom";
import ProductShow from './AllProducts';

import ProductByPrice from './Components/Shop/ProductByPrice';
import Login from './Components/loginpage';
import { Accounts } from './Components/Accounts';


function initializeReactGA() {
  ReactGA.initialize('G-WYFTDP4WJK'); // Replace with your actual tracking ID
}

function App() {
  initializeReactGA();
  const [decodedCookie, setDecodedCookie] = useState(null);
  const [userId, setUserId] = useState(null);
  const [redirected, setRedirected] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(null)
  const childRef = useRef(null);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    
    const fetchData = async () => {
      try {
        const cookieValue = await Cookies.get("stayyoung");
        if (cookieValue) {
          console.log(jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTI1In0.MrjWyThOBQ0no13R1vA2kGD9piRb5LyHww78FQrEwpQ"))
          const decodedValue = await JSON.parse(cookieValue);
         console.log(decodedValue)
           setDecodedCookie(decodedValue);
          const decodedAuth =  jwtDecode(decodedValue.auth);
          console.log(decodedValue)
          setUserId(parseInt(decodedAuth.user_id));
          
          await localStorage.setItem("redirected", "true");
        }
        else if (localStorage.getItem("redirected")) {
          localStorage.removeItem("redirected")
          setRedirected(true);
        }
      } catch (error) {
        console.error("Error decoding cookie:", error);
      }
    };

    fetchData();
   
  }, []);
  
  useEffect(() => {
    if (redirected) {
      
    }
  }, [redirected]);

  const handleChange = (data) => {
    setSearchKeyword(data)
  }

  const clearSearchKeyWord = () => {
    childRef.current.childFunction();
    setSearchKeyword("")
  }
  
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar ref={childRef} clearSearchKeyWord={clearSearchKeyWord} searchKeyword={searchKeyword} client={client} handleChange={handleChange} />
        <center className='mobile-navbar'>
          <Link to="/search-product" >
          <Input value={searchKeyword} style={{ width: "90%", marginBottom: "3%",marginTop:"3%" }} icon={{ name: 'search', link: true }} onChange={(e) => handleChange(e.target.value)} id="search-input" placeholder='Search...' />
          </Link>
        </center>
        <Routes>
          <Route path="/" element={<Shop  client={client} userId={userId} />} />
          <Route path="/shop" element={<Shop  client={client} userId={userId} />} />
          <Route path="/search-product" element={<SearchProduct clearSearchKeyWord={clearSearchKeyWord} searchKeyword={searchKeyword} client={client}  userId={userId} />} />
          <Route path="/cart" element={<Cart userId={userId} client={client} />} />
          <Route path="/blogs" element={<Blogs userId={userId} client={client} />} />
          <Route path="/load" element={<Loading userId={userId} />} />
          <Route path="/contact" element={<Contact userId={userId} />} />
          <Route path="/ourstory" element={<OurStory userId={userId} />} />
          <Route path="/hot-deals" element={<BestSeller userId={userId} title="Hot Deals" client={client} />} />
          <Route path="/bestsellers" element={<ProductShow  bestSeller="true" userId={userId} title="Best Sellers" client={client} />} />
          <Route path="/product/*" element={<Product userId={userId} client={client} />} />
          <Route path="/product-under-999" element={<ProductByPrice  price='999' userId={userId} client={client} />} />
          <Route path="/product-under-1499" element={<ProductByPrice  price='1499' userId={userId} client={client} />} />
          {/* <Route path="/product/Stay-Young/:productName/:productId/*" element={<Product userId={userId} client={client} />} /> */}
          <Route path="/category/:category" element={<Category userId={userId} client={client} />} />
          <Route path="/about" element={<About userId={userId} />} />
          <Route path="/brands/:brandName/*" element={<Brands userId={userId} client={client} />} />
          <Route path="/order" element={<Order client={client} userId={userId} />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivactPolicy />} />
          <Route path="shipping-and-return-policy" element={<CancellationAndRefund />} />
          <Route path="accounts" element={<Accounts client={client} userId={userId} />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      
        <Footer client={client} />
      </div>
    </BrowserRouter>
  );
}

export default App;
