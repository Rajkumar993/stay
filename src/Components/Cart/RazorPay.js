import { gql } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useMutation } from '@apollo/client';
import { SHOP_ID, DOMAIN } from "../../env";
import Logo from "../../Assets/Images/logo-text.png"
import userId from "../userId";
import { toast, Toaster } from "react-hot-toast";
import { SuccessAlert } from "./SuccessAlert";

const ORDER_BY_CART = gql`
mutation OrderbyCart($couponId: Int, $userId: Int, $shopId: Int, $voucherNo: String, $orderType: String, $customerId: Int, $customerName: String, $customerMobile: String, $customerAddress: String, $pickuptime: DateTime, $feedback: String, $shopPhone: String, $rating: Int) {
  OrderbyCart(couponId: $couponId, userId: $userId, shopId: $shopId, voucherNo: $voucherNo, orderType: $orderType, customerId: $customerId, customerName: $customerName, customerMobile: $customerMobile, customerAddress: $customerAddress, pickuptime: $pickuptime, feedback: $feedback, shopPhone: $shopPhone, rating: $rating) {
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

const INITIATE_PAYMENT = gql`
mutation InitiatePayment($amount: Int!, $name: String!, $number: String!, $phonePeId: String!, $phonePeKey: String!, $domain: String!) {
  initiatePayment(amount: $amount, name: $name, number: $number, phonePeId: $phonePeId, phonePeKey: $phonePeKey, domain: $domain) {
    message
    redirectUrl
    success
  }
}
`;

const userIdValue = await userId();
export default function PaymentComponent({ cartAmount, creditAmount, orderAddress, userIds, siteConfiq, getCartProductRefetch, customerName, cartItems, couponCodeId }) {
  const [razorpayRes, setRazorpayRes] = useState(null)
  // const [openAlert, setOpenAlert] = useState(false)

  const [Razorpay, isLoaded] = useRazorpay();
  const [initiatePayment, { loading, error }] = useMutation(INITIATE_PAYMENT);
  const [orderProduct, { loading: orderProductLoading, error: orderProductError }] = useMutation(ORDER_BY_CART);

  const handleAddAddress = (orderAddress) => {
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
          "couponId": couponCodeId 
        },
      })
        .then((response) => {
          // setOpenAlert(true)
          
          if (getCartProductRefetch) {
            getCartProductRefetch()
          }
        })
        .catch((mutationError) => {
          console.error('Mutation error:', mutationError);
        });
    } catch (err) {
      alert(err)
    }
  };

  useEffect(() => {
    if (razorpayRes) {
      handleAddAddress(orderAddress)
    }
  }, [razorpayRes])


  

  const handlePayment = useCallback(async (amount) => {
    let key = "XXXX";
    let id = "XXXXX";
    try {
      const response = await initiatePayment({
        variables: {
          amount: amount ? Number(amount) : 0, 
          name: customerName,
          number: JSON.stringify(userIdValue), 
          phonePeId: id, 
          phonePeKey: key,
          domain: DOMAIN
        },
      });
      if (response.data?.initiatePayment?.success) {
        window.location.href = response.data.initiatePayment.redirectUrl;
      } else {
        toast.error("Payment initiation failed.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error("An error occurred during payment initiation.");
    }
  }, [Razorpay, siteConfiq]);

// const closeAlert=()=>{
//   setOpenAlert(false)
// }

  return (
    <div >
      <button onClick={() => {
        let hasOverQuantityError = false;
        cartItems.map((item) => {
          if (item.noStock == null || item.noStock == 0 || item.noStock < item.quantity) {
            hasOverQuantityError = true;
          }
        })
        if(orderAddress) {
          if (hasOverQuantityError) {
            alert("Remove out of stocks products")
          } else {
            handlePayment(cartAmount)
          }
        }
        else {
          alert("Add Address!!!")
        }
      }} className={orderAddress?.id ? "checkout-button" : "checkout-button"}>Pay Now</button>
      
      {/* <SuccessAlert openAlert={openAlert}closeAlert={closeAlert} title='Order Placed Successfully' message={cartItems.map(i=>i.name)} Amount={cartAmount}  />
      <Toaster /> */}
    </div>
  );
}