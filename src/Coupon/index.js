import React, {Component} from "react";
import Coupon1 from "../Assets/Images/coupon-1.jpg"
import Coupon2 from "../Assets/Images/coupon-2.jpg"

class Coupon extends Component{
    render(){
        return(
            <div style={{display:"flex",width:"100%",height:"31%",justifyContent:"center",marginBottom:"5%"}}>
                <img src={Coupon1} style={{width:"45%",height:"95%"}}></img>
                <img src={Coupon2} style={{width:"45%",height:"95%"}}></img>
            </div>
        )
    }
}

export default Coupon;