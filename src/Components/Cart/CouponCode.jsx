import React, { useEffect, useState } from 'react'
import "../../Assets/Styles/Product.css";
import "../../Assets/Styles/Cart.css";
import { CiDiscount1 } from "react-icons/ci";
import Alert from '@mui/material/Alert';
function CouponCode({Coupon ,data, couponCodeId}) {
  const handleCoupon = (e) => {
  e.preventDefault();
  data(Coupon);
  }
  return (
    <div onClick={(e=>{handleCoupon(e)})} style={{ cursor: 'pointer', padding: '10px', borderRadius: '10px', backgroundColor: Coupon.id == couponCodeId ? "#868484" : "", color: 'white' }}>
    <div className="item-subtotal-amount">
                <h2
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontWeight: "700",
                    cursor:"pointer"
                  }}
                >
                  {Coupon.code}
                </h2>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontWeight: "700",
                  }}
                >
                   {Coupon.discount}%
                </p>
              </div>
              <div  className="item-subtotal-amount1">
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                   Purchase should be above: Rs. {Coupon.priceRange} 
                </p> 
              </div>
              
    </div>
  )
}

export default CouponCode;
