import React, { Component } from "react";


class CancellationAndRefund extends Component {
    render() {
        return (
            <div style={{ margin: "3% 15% 4% 5%" }}>
                <center> <h3 style={{ margin: "auto" }}>Shipping and Return Policy</h3></center>
                <h5 >Our Return policy</h5>
                <div style={{ marginBottom: "2%" }}>
                    <p style={{ marginBottom: "1%" }}>An exchange can be initiated in the rare case of a damaged or an incorrect product being 
delivered. Please get in touch with us on</p>
                    <div style={{ marginLeft: "4%" }}>
                        <ul>
                            <li>
                                Please send us your order ID information along with an unpacking video 
                                and images that clearly demonstrate the damaged/incorrect product that 
                                is being sought to be returned through email within 2-3 days from receiving 
                                the product. 
                            </li>
                            <li>
                                In case of a genuine request, you can ship the product(s) and 
                                (if we have the particular product in stock) send you the replacement 
                                as soon as we receive it back or we will refund the order value/ product 
                                value in 3-5 business days. 
                            </li>
                            <li>
                                Please note that the product has to be returned along with the original 
                                packaging including, labels and freebies, if any. 
                            </li>
                        </ul>
                    </div>
                    {/* <p style={{ marginBottom: "1%" }}>Returns are not accepted on products purchased during any Sale. In case of COD orders, the shipping + COD charges are non-refundable.</p> */}
                </div>

                <h5 >Our Shipping Policy</h5>
                <p style={{ marginBottom: "1%" }}>
                    We ship all orders within 1-2 business days. If the order has been made before 10 am we 
                    might be able to ship your order on the same day (we will try our best for this). Once shipped, 
                    your order will be delivered within 2-7 business days. Delivery times could be longer for 
                    remote locations.
                </p>
                <p style={{ marginBottom: "1%" }}>
                    If you want to cancel the order that has not been shipped yet, please email us at  
                    <a style={{ marginLeft: '5px' }} href="help@stayyoung.co.in">help@stayyoung.co.in</a> or what’s app us at +91-9842439397 
                </p>
                <h5>Charges for Cancellation after order Processing </h5>
                <p style={{ marginBottom: "1%" }}>
                    A ₹50 deduction will be applied for cancellations for orders that have left the warehouse. 
                </p>

            </div>
        )
    }
}

export default CancellationAndRefund;