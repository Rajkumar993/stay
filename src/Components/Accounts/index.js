import React, { Component, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { SHOP_ID } from "../../env";
import userId from "../userId";
import { ShippingAddress } from "./ShippingAddress";
import Orders from "../Order";
// import  OrderDetails  from "../Order/OrderDetails";
import { Grid, Card, Table } from "semantic-ui-react";
import Loading from "../../Loading";
import userDetails from "../userDetails";
import "../../Assets/Styles/Accounts.css"
import ProductReview from "../Order/ProductReview";


const GET_ADDRESS = gql`
  query Address($filter: addressFilter) {
    address(filter: $filter) {
      state
      country
      city
      street
      pincode
      phone
      name
      type
      id
    }
  }`

const GET_CREDITS = gql`
query UserOrderDetails($filter: userdetails) {
  userOrderDetails(filter: $filter) {
    lastOrderAddress
    creditPoints
  }
}`

const GET_ORDER_ITEMS_QUERY = gql`
  query OrderHistory($filter: orders) {
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
        status
        price
        tax
        dnp
        discount
        totalPrice
        Products {
          name
          prize
          discount
          id
          productId
          addedon
          tax
        }
      }
    }
  }
`;


const userIdValue = await userId();
const user = await userDetails()

export const Accounts = ({client}) => {

    const [shippingAddress, setShippingAddress] = useState(null);
    const [customerAddress, setCustomerAddress] = useState(null)
    const [orderHistory, setOrderHistory] = useState([]);
    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [orderLoading, setOrderLoading] = useState(false)
    const { loading: getCustomerAddressLoading, error: getCustomerAddressError, data: getCustomerAddressData, refetch: getCustomerAddressRefetch } = useQuery(GET_ADDRESS, {
        variables: {
            "filter": {
                "userId": userIdValue
            }
        },
    });

    const { loading: getOrderDetailsLoading, error: getOrderDetailsError, data: getOrderDetailsData, refetch: getOrderDetailsRefetch } = useQuery(GET_ORDER_ITEMS_QUERY, {
        variables: {
            "filter": {
                "shopId":SHOP_ID,
                "userId": userIdValue
            }
        },
    });

    const { loading: getCreditsLoading, error: getCreditsError, data: getCreditsData, refetch: getCreditsRefetch } = useQuery(GET_CREDITS, {
        variables: {
            "filter": {
                "shopId": SHOP_ID,
                "userId": userIdValue
            }
        },
    });

    console.log("**use", user);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling animation
        });
    }, [])


    useEffect(() => {
        if (getCustomerAddressLoading) {
            setLoading(true)
        }
        if (getCustomerAddressData) {
            setLoading(false)
            if (getCustomerAddressData.address) {
                setCustomerAddress(getCustomerAddressData.address)
                // setShippingAddress(getCustomerAddressData.address[getCustomerAddressData.address.length - 1])
            }
        }
     
      
        
        if (getCreditsData) {
            setUserDetails(getCreditsData?.userOrderDetails[0]  )
        }
    }, [getCustomerAddressData, getCreditsData, ])
  
    useEffect(()=>{
        if (getOrderDetailsLoading) {
       
            setOrderLoading(true)
        }
        if (getOrderDetailsData) {
      
            console.log("order hios",getOrderDetailsData.orderHistory)
            setOrderLoading(false)
            setOrderHistory(getOrderDetailsData?.orderHistory)
          
        }
        if(getOrderDetailsError){
            console.log(getOrderDetailsError)
        }
    },[getOrderDetailsData,getOrderDetailsLoading])

    useEffect(() => {
        if (customerAddress && userDetails) {
            let filteredArray = customerAddress.filter(item => item?.id === userDetails.lastOrderAddress);
            if (filteredArray) {
                setShippingAddress(filteredArray[0])
            } else {
                setShippingAddress(null)
            }
        }

    }, [customerAddress, userDetails])

    if (loading) {
        return (
            <Loading />
        )
    }

    if (!customerAddress) {
        return (
            <center style={{ marginTop: "5%", marginBottom: "5%" }}><h3>No Account Information</h3></center>

        )
    }



    return (
        <div style={{ padding: "2%", marginBottom: "4%" }}>
            <div>
                <h2 style={{ textAlign: "center" }}>Account Information</h2>
                <Grid>
                    <Grid.Column className="account-container1" style={{marginTop:"3%"}} mobile={16} tablet={16} computer={!orderHistory && !orderLoading ? 16 : 8}>
                        <div style={{ width: "100%", marginTop: "2%", }}>
                            <div style={{ marginTop: "3%", marginBottom: "2%", }}>
                                <h4 style={{ width: "65%", textAlign: "justify" }}>Customer Details</h4>
                                <Card style={{ marginBottom: "3%", width: "95%" }}>
                         <Card.Content>
                                        <Grid style={{ padding: "2%", textAlign: "justify" }}>
                                            <Grid.Column mobile={16} tablet={8} computer={5}>
                                                <span >Name:</span>
                                                <span style={{ marginLeft: "3%" }}>{user.user_name}</span>
                                            </Grid.Column>
                                            <Grid.Column mobile={16} tablet={8} computer={5}>
                                                <span > Phone:</span>
                                                <span style={{ marginLeft: "3%" }}>{user.mobile}</span>
                                            </Grid.Column>
                                            <Grid.Column mobile={16} tablet={8} computer={5}>
                                                <span >Credit Points:</span>
                                                <span style={{ marginLeft: "3%" }}>{userDetails?.creditPoints ? userDetails?.creditPoints : 0}</span>
                                            </Grid.Column>
                             </Grid>
                                        {/* <center>  <h4></h4></center> */}
                                    </Card.Content>
                                </Card>
                            </div>
                            <div style={{ marginTop: "3%", marginBottom: "2%", }}>
                                <ShippingAddress getCreditsRefetch={getCreditsRefetch} userDetails={userDetails} getCustomerAddressRefetch={getCustomerAddressRefetch} shippingAddress={shippingAddress} currentAddress={true} />
                            </div>
                            <div style={{ marginTop: "3%", marginBottom: "2%" }}>
                                <h4 style={{ width: "65%", textAlign: "justify" }}>Shipping Address</h4>
                                {customerAddress?.map((item) => {
                                    return (
                                        <div style={{ marginBottom: "2%" }}>
                                            <ShippingAddress getCreditsRefetch={getCreditsRefetch} getCustomerAddressRefetch={getCustomerAddressRefetch} shippingAddress={item} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Grid.Column>
                   
                    {!orderLoading?<Grid.Column style={{ overflowX: "hidden",marginTop:"3%" }} mobile={16} tablet={16} computer={8}>
                            <div style={{overflowY:"hidden"}} className="my-orders">
                                <h4 style={{ width: "65%", textAlign: "justify" }}>My Orders</h4>
                               
                              
                               <div style={{width:"100%"}}> <Orders client={client} /></div>
                             
                            </div>
                        </Grid.Column>:<center><div><Loading/></div></center> }
                </Grid>
            </div>
        </div >

    )
}