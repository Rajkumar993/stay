import React, { Component, useState, useEffect } from "react";
import "../../Assets/Styles/Cart.css";
import EmptyCart from "../../Assets/Images/empty-cart.jpg";
import { Link } from "react-router-dom";
import P5 from "../../Assets/Images/p5.jpg";
import P1 from "../../Assets/Images/p1.jpg";
import P3 from "../../Assets/Images/p3.jpg";
import P4 from "../../Assets/Images/p4.jpg";
import CartItems from "./CartItems";
import { gql, useQuery, useMutation } from "@apollo/client";
import { DOMAIN, SHOP_ID } from "../../env";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../../Loading";
import PaymentComponent from "./RazorPay";
import userId from "../userId";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Dropdown, Input, Grid } from "semantic-ui-react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { isNullish } from "@apollo/client/cache/inmemory/helpers";
import CouponCode from "./CouponCode";
import { useSearchParams } from 'react-router-dom';
import { useResetProjection } from "framer-motion";
import { SuccessAlert } from "./SuccessAlert";
import { Domain } from "@mui/icons-material";

const GET_COUPON_CODE = gql`
  query ExampleQuery($filter: couponFilter) {
    couponCode(filter: $filter) {
      code
      description
      discount
      id
      name
      priceRange
      shopId
      status
      userId
      validityFrom
      validityTo
    }
  }
`;
const GET_CART_ITEMS_QUERY = gql`
  query ExampleQuery($filter: CartFilter1) {
    cart(filter: $filter) {
      id
      productId
      userId
      shopId
      quantity
      featureImage
      name
      description
      prize
      mastercategory
      category
      hsnCode
      minStock
      noStock
      tax
      Discount
    }
  }
`;

const CHECK_PAYMENT_STATUS = gql`
  mutation CheckPaymentStatus($transactionId: String!) {
    checkPaymentStatus(transactionId: $transactionId) {
      success
      status
      message
    }
  }
`;

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

const GET_CREDITS = gql`
  query UserOrderDetails($filter: userdetails) {
    userOrderDetails(filter: $filter) {
      lastOrderAddress
      creditPoints
    }
  }
`;

const GET_SITE_CONFIQURATION = gql`
  query Shop($filter: ShopInput) {
    shop(filter: $filter) {
      siteConfigurations {
        razorpayKey
        razorpaySecretKey,
        phonePeId
        phonePeKey
      }
      phone
    }
  }
`;

const GET_STATE = gql`
  query Getstate($filter: pincodeFilter) {
    getstate(filter: $filter) {
      pinCode
      district
      state
      name
      region
    }
  }
`;

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
  }
`;

const ADD_ADDRESS = gql`
  mutation Address(
    $addressId: Int
    $userId: Int
    $type: String
    $country: String
    $state: String
    $city: String
    $street: String
    $pincode: String
    $phone: String
    $name: String
  ) {
    Address(
      id: $addressId
      userId: $userId
      type: $type
      country: $country
      state: $state
      city: $city
      street: $street
      pincode: $pincode
      phone: $phone
      name: $name
    ) {
      id
      userId
      type
      country
      state
      city
      street
      pincode
      phone
      name
      status
    }
  }
`;

const ORDER_BY_CART = gql`
mutation OrderbyCart($userId: Int, $shopId: Int, $voucherNo: String, $orderType: String, $customerId: Int, $customerName: String, $customerMobile: String, $customerAddress: String, $pickuptime: DateTime, $feedback: String, $shopPhone: String, $rating: Int) {
  OrderbyCart(userId: $userId, shopId: $shopId, voucherNo: $voucherNo, orderType: $orderType, customerId: $customerId, customerName: $customerName, customerMobile: $customerMobile, customerAddress: $customerAddress, pickuptime: $pickuptime, feedback: $feedback, shopPhone: $shopPhone, rating: $rating) {
    id
    shopId
    orderType
    customerId
    customerName
    customerMobile
    customerAddress
    customerGstin
    userOrder
    pickuptime
    rating
    feedback
    paymentInfo
  }
}
`

const userIdValue = await userId();

export const Cart = ({ client }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [addressDialog, setAddressDialog] = useState(false);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [customerName, setCustomerName] = useState(null);
  const [cusomerPhoneNumber, setCusomerPhoneNumber] = useState(null);
  const [customerStreet, setCustomerStreet] = useState(null);
  const [customerCountry, setCustomerCountry] = useState(null);
  const [customerPincode, setCustomerPincode] = useState(null);
  const [customerCity, setCustomerCity] = useState(null);
  const [customerState, setCustomerState] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteConfiq, setSiteConfiq] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [userIds, setUserIds] = useState(null);
  const [orderAddress, setOrderAddress] = useState(null);
  const [customerPhone, setCusomerPhone] = useState(null);
  const [newcustomerPhone, setNewCusomerPhone] = useState(null);
  const [newcustomerName, setNewCusomerName] = useState(null);
  const [newcustomerCity, setNewCusomerCity] = useState(null);
  const [newcustomerState, setNewCusomerState] = useState(null);
  const [newcustomerStreet, setNewCusomerStreet] = useState(null);
  const [newcustomerPincode, setNewCustomerPincode] = useState(null);
  const [newcustomerCountry, setNewCusomerCountry] = useState(null);
  const [addAddressDialog, setAddAddressDialog] = useState(false);
  const [overQuantityError, setOverQuantityError] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);
  const [creditsPoints, setCreditPoints] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);
  const [availableCreditAmount, setAvailableCreditAmount] = useState(null);
  const [useCreditPoint, setUseCreditPoints] = useState(null);
  const [divisionOption, setDivisionOption] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [isCouponClicked, setisCouponClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderProduct, { loading: orderProductLoading, error: orderProductError }] = useMutation(ORDER_BY_CART);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCodeId, setCouponCodeId] = useState(0);
  const [couponText,setCouponText] = useState("");
  const [openAlert, setOpenAlert] = useState(false)
  const [message,setMessage]=useState("")
  const [checkPaymentStatus] = useMutation(CHECK_PAYMENT_STATUS);
  const [
    addAddressQuery,
    { loading: addAddressQueryLoading, error: addAddressQueryError },
  ] = useMutation(ADD_ADDRESS);
  const [searchParams] = useSearchParams();


  function couponDlt(data) {
    setisCouponClicked(false);
  }
  function handleCoupon(e) {
    
    if(isCouponClicked){
      return;
    }
    const c = [];
    const inputCoupon = couponText;
    let check = 0;
    for(let i =0;i<coupon.length;i++){
      if(inputCoupon === coupon[i].code ){
        check = 1;
        console.log( totalAmount())
        if(coupon[i].priceRange > totalAmount()){
          window.alert(`Choose appropriate coupon according to your purchase. Discount Amount: Rs. ${coupon[i].priceRange}`);
          return;
        }
        c.push(coupon[i]);
        console.log(coupon[i].code)
        setisCouponClicked(true);
        let couponDiscount = (totalAmount() * c[0].discount) / 100;
         setCouponDiscount(couponDiscount.toFixed(0));
      }

    }
    if (check == 0) {
      alert("Invalid Coupon Code.")
    }
  }
  const {
    loading: getRazorIdLoading,
    error: getRazorIdError,
    data: getRazorIdData,
    refetch: getRazorIdRefetch,
  } = useQuery(GET_SITE_CONFIQURATION, {
    variables: {
      filter: {
        id: SHOP_ID,
      },
    },
  });

  const {
    loading: getCartProductLoading,
    error: getCartProductError,
    data: getCartProductData,
    refetch: getCartProductRefetch,
  } = useQuery(GET_CART_ITEMS_QUERY, {
    variables: {
      filter: {
        shopId: SHOP_ID,
        userId: userIdValue,
      },
    },
  });

  const {
    loading: getCreditsLoading,
    error: getCreditsError,
    data: getCreditsData,
    refetch: getCreditsRefetch,
  } = useQuery(GET_CREDITS, {
    variables: {
      filter: {
        shopId: SHOP_ID,
        userId: userIdValue,
      },
    },
  });

  const {
    loading: getCustomerAddressLoading,
    error: getCustomerAddressError,
    data: getCustomerAddressData,
    refetch: getCustomerAddressRefetch,
  } = useQuery(GET_ADDRESS, {
    variables: {
      filter: {
        userId: userIdValue,
      },
    },
  });

  const {
    loading: getOrderDetailsLoading,
    error: getOrderDetailsError,
    data: getOrderDetailsData,
    refetch: getOrderDetailsRefetch,
  } = useQuery(GET_ORDER_ITEMS_QUERY, {
    variables: {
      filter: {
        userId: userIdValue,
      },
    },
  });

  useEffect(() => {
    if (getRazorIdData) {
      setSiteConfiq(getRazorIdData.shop[0]);

    }
  }, [getRazorIdData]);

  useEffect(() => {
    if (getOrderDetailsData) {
      setOrderHistory(getOrderDetailsData.orderHistory);
    }
    if (getCreditsData) {
      setCreditAmount(getCreditsData?.userOrderDetails[0].creditPoints);
    }
  }, [getOrderDetailsData, getCreditsData]);

  useEffect(() => {
    if (orderAddress !== null) {
      fetchPaymentStatus();
    }
  }, [orderAddress]);

  const fetchPaymentStatus = async () => {
    const transactionId = searchParams.get('id');
    if (transactionId) {
      setLoading(true)
      try {
        const { data } = await checkPaymentStatus({ variables: { transactionId } });
        if (data.checkPaymentStatus.success) {
         
          // toast.success(data.checkPaymentStatus.message);
          setMessage(data.checkPaymentStatus.message)
          handleAddAddress(orderAddress);
        } else {
          toast.error(data.checkPaymentStatus.message);
          setLoading(false)
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
        setLoading(false)
      }
    }
  };

  const handleAddAddress = async (orderAddress) => {
    try {
      orderProduct({
        variables: {
          "userId": userIdValue,
          "shopId": SHOP_ID,
          "voucherNo": "1",
          "orderType": "cart",
          "customerId": orderAddress.id,
          "customerName": orderAddress.name,
          "customerMobile": orderAddress.phone,
          "customerAddress": `${orderAddress.street} ${orderAddress.city},${orderAddress.state},${orderAddress.country}-${orderAddress.pincode}`,
          "pickuptime": "",
          "feedback": "",
          "creditAmount": creditAmount * -1,
          "rating": 4,
          "shopPhone": siteConfiq?.phone,
          "couponId": 0 
        },
      })
        .then((response) => {
          setLoading(false)
          toast.success("ORDER PLACED SUCCESSFULLY");
          setOpenAlert(true)
        //  ;
          if (getCartProductRefetch) {
            getCartProductRefetch()
          }
        })
        .catch((mutationError) => {
          setLoading(false)
          console.error('Mutation error:', mutationError);
        });
    } catch (err) {
      alert(err)
      setLoading(false)
    }
  };

  useEffect(() => {
    if (getCartProductLoading) {
      setLoading(true);
    }
    if (getCartProductRefetch) {
      getCartProductRefetch();
    }
    if (getCartProductError) {
      console.log("getCartProductError", getCartProductError);
    }

    if (getCartProductData) {
      let amount = 0;
      let discount = 0;
      for (let i = 0; i < getCartProductData.cart.length; i++) {
        if (getCartProductData.cart[i]) {
          let price = getCartProductData.cart[i].prize;
          let Discount = getCartProductData.cart[i].Discount;
          price = price - Discount;
          if (Discount) {
            discount = +(
              Discount * getCartProductData.cart[i].quantity +
              (Discount *
                getCartProductData.cart[i].quantity *
                getCartProductData.cart[i].tax) /
                100
            );
          }
          amount += +(
            getCartProductData.cart[i].prize *
              getCartProductData.cart[i].quantity +
            (getCartProductData.cart[i].prize *
              getCartProductData.cart[i].quantity *
              getCartProductData.cart[i].tax) /
              100
          );
        }
      }
      console.log("cart", getCartProductData.cart);
      setCartItems(getCartProductData.cart);
      setCartAmount(amount.toFixed(0));
      setDiscount(discount.toFixed(0));

      setUserIds(userIds);
      setLoading(false);
    }
  }, [getCartProductRefetch, getCartProductError, getCartProductData, coupon]);
  const {
    loading: loadingG,
    error,
    data: couponData,
  } = useQuery(GET_COUPON_CODE, {
    variables: {
      filter: {
        shopId: 362,
        userId: 1,
      },
    },
  });
  useEffect(() => {
    if (!loadingG && couponData && !error) {
      console.log(couponData.couponCode);
      setCoupon(couponData.couponCode);
    }
  }, [couponData, loadingG, error]);

  const validateCoupons = (coupons) => {
    let validCoupons = [];
    let total = totalAmount();
    coupons.forEach((cp) => {
      if (total >= cp.priceRange) {
        validCoupons.push(cp);
      }
    });
    setCoupon(validCoupons);
  };
  const totalAmount = () => {
    let value;
    let offerAmount = cartAmount - discount;
    value = offerAmount < 1500 ? offerAmount + 50 : offerAmount;
    if (creditsPoints && creditAmount < value) {
      value = value - creditAmount;
      if (availableCreditAmount || useCreditPoint) {
        setUseCreditPoints(null);
        setAvailableCreditAmount(null);
      }
    } else if (creditsPoints && creditAmount > value) {
      let bending = value - 50;
      bending = creditAmount - bending;
      if (!availableCreditAmount || bending != availableCreditAmount) {
        setAvailableCreditAmount(bending);
        setUseCreditPoints(creditAmount - bending);
      }
      console.log("bending", bending);
      value = 50;
    }
    return value.toFixed(0);
  };

  useEffect(() => {
    if (getCustomerAddressData) {
      let customerAddresses = getCustomerAddressData.address;
      setOrderAddress(
        customerAddresses[0]
          ? customerAddresses[customerAddresses?.length - 1]
          : ""
      );
      setCustomerAddress(customerAddresses);
      setCustomerId(
        customerAddresses[0]?.id
          ? customerAddresses[customerAddresses?.length - 1]?.id
          : ""
      );
      setCustomerStreet(
        customerAddresses[0]?.street
          ? customerAddresses[customerAddresses?.length - 1]?.street
          : ""
      );
      setCustomerCity(
        customerAddresses[0]?.city
          ? customerAddresses[customerAddresses?.length - 1]?.city
          : ""
      );
      setCustomerState(
        customerAddresses[0]?.state
          ? customerAddresses[customerAddresses?.length - 1]?.state
          : ""
      );
      setCustomerPincode(
        customerAddresses[0]?.pincode
          ? customerAddresses[customerAddresses?.length - 1]?.pincode
          : ""
      );
      setCustomerName(
        customerAddresses[0]?.name
          ? customerAddresses[customerAddresses?.length - 1]?.name
          : ""
      );
      setCusomerPhone(
        customerAddresses[0]?.phone
          ? customerAddresses[customerAddresses?.length - 1]?.phone
          : ""
      );
    }
  }, [getCustomerAddressData]);

  const addAddress = () => {
    if (!newcustomerPhone || newcustomerPhone.length != 10) {
      alert("Please check mobile number!!!");
      return;
    }
    addAddressQuery({
      variables: {
        userId: userIdValue,
        country: newcustomerCountry,
        state: newcustomerState,
        city: newcustomerCity,
        street: newcustomerStreet,
        pincode: newcustomerPincode,
        phone: newcustomerPhone,
        name: newcustomerName,
        type: "home",
      },
    })
      .then((response) => {
        if (getCustomerAddressRefetch) {
          setAddAddressDialog(false);
          getCustomerAddressRefetch();
        }
      })
      .catch((mutationError) => {
        console.error("Mutation error:", mutationError);
      });
  };
  const closeAlert=()=>{
    setOpenAlert(false)
    window.location.href=DOMAIN
  }
  const getState = async (pincode) => {
    setNewCusomerCity("Loading City...");
    setNewCusomerState("Loading State...");
    setNewCusomerCountry("Loading Country...");
    try {
      const { data } = await client.query({
        query: GET_STATE,
        variables: {
          filter: {
            pincode: pincode.toString(),
          },
        },
      });
      let divisionOption = [];
      data.getstate.map((v) => {
        divisionOption.push({
          key: v.division,
          text: v.division,
          value: v.division,
        });
      });
      setDivisionOption(divisionOption);
      setNewCusomerCity(data.getstate[0].district);
      setNewCusomerState(data.getstate[0].state);
      setNewCusomerCountry("India");
    } catch (error) {
      console.error("Error fetching state:", error);
      setNewCusomerCity("");
      setNewCusomerState("");
      setNewCusomerCountry("");
    }
  };

  return (
    <div className="cart-container">
      <Toaster />
      <div className="cart-title-container">
        <h1 className="cart-title">Shopping Cart</h1>
        {loading ? (
          <center>
            <Loading loading={loading} />
          </center>
        ) : null}
      </div>
      <div className="cart-content">
        <div className="card-item-container">
          {cartItems?.length <= 0 ? (
            <div className="empty-cart-container">
              <img
                style={{ width: "50px", height: "50px" }}
                src={EmptyCart}
              ></img>
              <span className="empty-cart-para">Your cart is empty</span>
              <span
                style={{
                  fontWeight: "200",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                Looks like you have not added anything in your cart.
                <br />
                Go ahead and explore top categories.
              </span>
              <Link to="/shop" className="continue-button">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "300" }}>
                Cart Items
              </h3>
              {cartItems.map((item) => {
                if (!item) {
                  return;
                }

                return (
                  <CartItems
                    deleteData={couponDlt}
                    userIds={userIds}
                    item={item}
                    getCartItems={getCartProductData}
                    client={client}
                    getCartProductRefetch={getCartProductRefetch}
                    overQuantityError={overQuantityError}
                  />
                );
              })}
            </div>
          )}
        </div>
        {cartItems.length > 0 ? (
          <div style={{ flex: "1", paddingTop: "1.9%" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: "300" }}>Summary</h3>
            <div className="item-calculation-cantiner">
              <div className="item-subtotal-amount">
                <div style={{ display: "flex" }}>
                  <span
                    style={{
                      fontSize: "23px",
                      marginRight: "3%",
                      marginTop: "1%",
                    }}
                  >
                    {" "}
                    <CiDiscount1 />
                  </span>
                  <span>
                    <h2
                      style={{
                        fontSize: "1.30rem",
                        color: "#000",
                        fontWeight: "500",
                        width: "113%",
                      }}
                    >
                      {" "}
                      Credit Points{" "}
                    </h2>
                  </span>
                  <span
                    style={{
                      fontSize: "23px",
                      marginRight: "3%",
                      marginTop: "1%",
                    }}
                  ></span>
                </div>

                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  ₹ {creditAmount ? creditAmount : 0}
                  {creditAmount ? (
                    <Checkbox
                      style={{ color: "black" }}
                      onChange={(e) => {
                        setCreditPoints(e.target.checked);
                        if (!e.target.checked) {
                          setAvailableCreditAmount(null);
                          setUseCreditPoints(null);
                        }
                      }}
                    />
                  ) : null}
                </p>
              </div>

              {availableCreditAmount ? (
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontWeight: "300",
                    width: "113%",
                  }}
                >
                  {" "}
                  Available Credit Points {availableCreditAmount}{" "}
                </div>
              ) : null}
            </div>
            {/* coupon code */}
            <div className="item-calculation-cantiner">
              {/* <h2 style={{fontSize:"1.30rem"}}>Coupon Code : </h2> */}
              <div>
                <h3> Coupon Code</h3>
                <div className="coupon-input">
                  <input onChange={(e)=>{
                    setCouponText(e.target.value);
                  }} type="text"></input>{" "}
                  <button className="product-autocart4" onClick={(e)=>{
                    e.preventDefault();
                    handleCoupon(e);
                    }}>APPLY</button>
                </div>
              </div>
            </div>
            <div className="item-calculation-cantiner">
              <div className="item-subtotal-amount">
                <h2
                  style={{
                    fontSize: "1.30rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  Subtotal
                </h2>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  ₹ {cartAmount}
                </p>
              </div>

              <div className="item-subtotal-amount">
                <h2 style={{ fontSize: "1.30rem", fontWeight: "300" }}>
                  Discount
                </h2>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  ₹ {discount}
                </p>
              </div>
              {creditsPoints ? (
                <div className="item-subtotal-amount">
                  <h2 style={{ fontSize: "1.30rem", fontWeight: "300" }}>
                    Credit Points
                  </h2>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    {useCreditPoint
                      ? `- ₹ ${useCreditPoint}`
                      : `- ₹ ${creditAmount}`}
                  </p>
                </div>
              ) : null}

              <div className="item-subtotal-amount">
                <h2
                  style={{
                    fontSize: "1.30rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  Delivery Charge
                </h2>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  ₹ {cartAmount - discount < 1500 ? 50 : isCouponClicked==true?totalAmount()-couponDiscount<1500?50:0:0}
                </p>
              </div>

              {isCouponClicked ? (
                <div className="item-subtotal-amount">
                  <h2
                    style={{
                      fontSize: "1.30rem",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    Coupon Discount
                  </h2>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    ₹ {couponDiscount}
                  </p>
                </div>
              ) : null}
              <div className="item-total-amount">
                <h2
                  style={{
                    fontSize: "1.30rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  Total
                </h2>
                <p
                  style={{
                    fontSize: "1.30rem",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  ₹{" "}
                  {isCouponClicked == true
                    ? totalAmount() - couponDiscount <1500? totalAmount() - couponDiscount + 50 :
                    totalAmount() - couponDiscount : totalAmount()}
                </p>
              </div>
              <p className="item-total-para">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs.
              </p>
            </div>

            <div className="item-calculation-cantiner">
              {customerAddress.length ? (
                <Grid>
                  <Grid.Column mobile={14} computer={14} tablet={14}>
                    <b>Delivery Details</b>
                    <br />
                  </Grid.Column>
                  <Grid.Column mobile={2} computer={2} tablet={2}>
                    <b
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAddAddressDialog(true);
                        setAddressDialog(false);
                      }}
                    >
                      Add
                    </b>
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    computer={16}
                    tablet={16}
                    style={{ marginTop: "-2%" }}
                  >
                    <b>{`Customer Name: ${customerName}`}</b>
                    <br />
                    <b>{`Customer Mobile: ${customerPhone}`}</b>
                    <br />
                    <b>Address</b>
                    <br />
                    <p>
                      {`${customerStreet}, ${customerCity},`}
                      <br />
                      {`${customerState}, ${customerPincode},`}
                    </p>
                    <p
                      onClick={() => setAddressDialog(true)}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Change Delivery Address
                    </p>
                  </Grid.Column>
                </Grid>
              ) : (
                <Grid>
                  <Grid.Column mobile={14} computer={14} tablet={14}>
                    <b>Delivery Details</b>
                    <br />
                  </Grid.Column>
                  <Grid.Column mobile={2} computer={2} tablet={2}>
                    <b
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAddressDialog(false);
                        setAddAddressDialog(true);
                      }}
                    >
                      Add
                    </b>
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    computer={16}
                    tablet={16}
                    style={{ marginTop: "-2%" }}
                  >
                    <center>
                      <button
                        onClick={() => {
                          setAddAddressDialog(false);
                          setAddAddressDialog(true);
                        }}
                        className="checkout-button1"
                      >
                        Add Address
                      </button>
                    </center>
                  </Grid.Column>
                </Grid>
              )}
            </div>
            <PaymentComponent
              getCartProductRefetch={getCartProductRefetch}
              siteConfiq={siteConfiq}
              orderAddress={orderAddress}
              couponCodeId={couponCodeId}
              creditAmount={
                creditsPoints
                  ? useCreditPoint
                    ? useCreditPoint
                    : creditAmount
                  : null
              }
              
              cartItems={cartItems}
              cartAmount={
                isCouponClicked ? totalAmount() - couponDiscount : totalAmount()
              }
              userIds={userIds}
              overQuantityError={overQuantityError}
              customerName={customerName}
            />

            <Dialog
              open={addressDialog}
              onClose={() => {
                setAddressDialog(false);
              }}
            >
              <DialogTitle>Change Delivery Address</DialogTitle>
              <DialogContent style={{ marginLeft: "3%" }}>
                {customerAddress.map((address, index) => {
                  return (
                    <Grid>
                      <Grid.Column mobile={2} computer={2} tablet={2}>
                        <Checkbox
                          checked={customerId == address.id ? true : false}
                          onChange={() => {
                            setOrderAddress(address);
                            setCustomerId(address.id);
                            setCustomerCity(address.city);
                            setCusomerPhone(address.phone);
                            setCustomerName(address.name);
                            setCustomerPincode(address.pincode);
                            setCustomerState(address.state);
                            setCustomerStreet(address.street);
                          }}
                        />
                      </Grid.Column>
                      <Grid.Column mobile={14} computer={14} tablet={14}>
                        <div>Name : {address.name}</div>
                        <div>
                          Address : {address.street} {address.city},
                          {address.state}
                        </div>
                        <div>
                          {address.state}-{address.pincode}
                        </div>
                        <div>Phone Number: {address.phone}</div>
                      </Grid.Column>
                    </Grid>
                  );
                })}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  style={{ color: "red", border: "1px solid black" }}
                  onClick={() => {
                    setAddressDialog(false);
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              variant="outlined"
              open={addAddressDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              onClose={() => {
                setAddAddressDialog(false);
              }}
            >
              <DialogTitle>Add Address</DialogTitle>
              <DialogContent>
                <div className="customer-number">
                  <div>
                    <label>Name</label>
                    <Input
                      style={{ width: "95%" }}
                      placeholder="Name"
                      onChange={(e) => {
                        setNewCusomerName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <Input
                      type="number"
                      style={{ width: "95%" }}
                      placeholder="Phone Number"
                      onChange={(e) => {
                        // setCusomerPhoneNumber(e.target.value)
                        setNewCusomerPhone(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Address</label>
                    <Input
                      style={{ width: "95%" }}
                      placeholder="Address"
                      onChange={(e) => {
                        setNewCusomerStreet(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Pincode</label>
                    <Input
                      type="number"
                      style={{ width: "95%" }}
                      placeholder="Pincode"
                      onChange={(e) => {
                        setNewCustomerPincode(e.target.value);
                        if (e.target.value.length > 5) {
                          getState(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <Input
                      style={{ width: "95%" }}
                      placeholder="City"
                      onChange={(e) => {
                        setNewCusomerCity(e.target.value);
                      }}
                      disabled={
                        newcustomerCity == "Loading City..." ? true : false
                      }
                      value={newcustomerCity}
                    />
                  </div>

                  <div>
                    <label>State</label>
                    <Input
                      style={{ width: "95%" }}
                      placeholder="State"
                      onChange={(e) => {
                        setNewCusomerState(e.target.value);
                      }}
                      disabled={
                        newcustomerState == "Loading State..." ? true : false
                      }
                      value={newcustomerState}
                    />
                  </div>
                  <div>
                    <label>Country</label>
                    <Input
                      style={{ width: "95%" }}
                      disabled={
                        newcustomerCountry == "Loading Country..."
                          ? true
                          : false
                      }
                      placeholder="Country"
                      onChange={(e) => {
                        setNewCusomerCountry(e.target.value);
                      }}
                      value={newcustomerCountry}
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ color: "green", border: "1px solid black" }}
                  onClick={() => {
                    addAddress();
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: "red", border: "1px solid black" }}
                  onClick={() => {
                    setAddAddressDialog(false);
                    setNewCusomerCity(null);
                    setNewCusomerPhone(null);
                    setNewCusomerCountry(null);
                    setNewCusomerName(null);
                    setNewCustomerPincode(null);
                    setNewCusomerStreet(null);
                    setNewCusomerState(null);
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
      </div>
      {/* <button onClick={()=>setOpenAlert(true)}>hi</button> */}
      <SuccessAlert openAlert={openAlert} closeAlert={closeAlert} title={"Order Placed Successfully"} message={cartItems.map(i=>i.name)} Amount= {isCouponClicked == true
                    ? totalAmount() - couponDiscount <1500? totalAmount() - couponDiscount + 50 :
                    totalAmount() - couponDiscount : totalAmount()}  />
    </div>
  );
};
