import { gql } from "@apollo/client";
import React, { Component } from "react";
import "../../Assets/Styles/Order.css"
import { SHOP_ID } from "../../env";
import P1 from "../../Assets/Images/p1.jpg"


const GET_ORDER_ITEMS_QUERY = gql`query OrderHistory($filter: orders) {
    orderHistory(filter: $filter) {
      shopId
      customerId
      customerName
      customerMobile
      id
      customerAddress
      voucherNo
      orderType
      customerGstin
      userOrder
      pickuptime
      rating
      feedback
      paymentInfo
      orderdetails {
        id
        masterId
        stockId
        quantity
        Products {
          name
          prize
          discount
          addedon
        }
      }
    }
  }
`

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            orderHistory:[]
        }
    }

    componentDidMount() {
        this.getOrderItems()
    }


    getOrderItems = async () => {
        try {
            const { data } = await this.props.client.query({
                query: GET_ORDER_ITEMS_QUERY,
                variables: {
                    filter: {
                        shopId: SHOP_ID,
                        userId: 1,
                    },
                },
            });
            if (data.orderHistory) {
                this.setState({ orderHistory: data.orderHistory.slice(0, 10) })
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }
    render() {
        let orderTime;
        return (
            <div className="order-container">
                
                <div>
                    <div className="order-item-container">
                     {
    this.state.orderHistory.map((item) => {
        const time = item.pickuptime;
        const convertDate = new Date(time);
       const options = { year: 'numeric', month: 'short', day: 'numeric' };
       const pickupTime = convertDate.toLocaleDateString('en-US', options);
        return (
            <React.Fragment>
                <div className="order-details">
                    <div style={{ opacity: "0.5" }}>Pickup Date:</div>
                    <div style={{ marginLeft: "0.3%" }}>{pickupTime}</div>
                    <div style={{ opacity: "0.5",marginLeft:"3%" }}>Order ID:</div>
                    <div style={{ marginLeft: "0.3%" }}>{item.id}</div>
                    <div style={{ opacity: "0.5",marginLeft:"3%" }}>Customer ID:</div>
                    <div style={{ marginLeft: "0.3%" }}>{item.customerId}</div>
                </div>
            {
                item.orderdetails.map((productDetails) => {
                    let quantity = productDetails.quantity;
                   return(
                    <React.Fragment>
                        {productDetails.Products.map((product)=>{
                            const orderDate = product.addedon;
                            const date = new Date(orderDate);
                           const orderOptions = { year: 'numeric', month: 'short', day: 'numeric' };
                            orderTime = date.toLocaleDateString('en-US', orderOptions);
                            return(
                                <div className="order-item" >
                                      <img style={{ width: "15%", height: "18%" }} src={product.featureImage ? P1 : P1}></img>
                                            <h4 style={{ padding: "0", margin: "0", marginLeft: "2%", fontSize: "20px" }}>{product.name}</h4>
                                                 <div style={{ marginLeft: "auto", fontSize: "15px", marginTop: "1%" }}>
                                                        <span> {product.discount > 0 ? `₹${Math.ceil(product.prize) - Math.ceil(product.discount)}` : `₹${Math.ceil(product.prize)}`}</span>
                                                        <span style={{ marginLeft: "8%", textDecoration: "line-through", fontSize: "13px", opacity: "0.7" }}>{product.discount > 0 ? `₹${Math.ceil(product.prize)}` : ""}</span>
                                                        <div style={{ textAlign: "end" }}> qty :{quantity}</div>
                                                 </div>
                                </div>
                            )
                        })}
                                        <div className="oreder-address-container">
                 <div>
                         <div className="oreder-pay-title">Payment</div>
                    </div>
                    <div className="customer-address">
                         <div className="oreder-pay-title">Delivery</div>
                        <div style={{fontSize:"14px",opacity:"0.7",paddingTop:"4%"}}>Address</div>
                        <div style={{paddingTop:"2%",fontSize:"16px",width:"60%"}}>
                                Name: {item.customerName}
                         </div>
                         <div style={{paddingTop:"2%",fontSize:"16px",width:"80%"}}>
                                63/30Ahimaspuram 5th street sellur madurai-02.
                                <br></br>
                                Mobile:{item.customerMobile}
                                <br></br>
                                Order Date:{orderTime}
                         </div>
                     </div>
                 </div>
                    </React.Fragment>
                   )

                })
            }
            </React.Fragment>
        )
    })
}
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;
