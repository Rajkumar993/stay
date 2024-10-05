import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom"
import { Popup } from 'semantic-ui-react'
import { gql } from "@apollo/client";
import { SHOP_ID, DOMAIN } from "../env";
import Empty from "../Assets/Images/empty.jpg";
import userId from '../Components/userId';
import { toast, Toaster } from "react-hot-toast";
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'

const AddToCartQuery = gql`mutation Mutation($productId: Int, $shopId: Int, $userId: Int) {
    Cart(productId: $productId, shopId: $shopId, userId: $userId) {
      shopId
      productId
      userId
    }
  }`


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIcons: true,
            showBestSellerTag: true
        }
        this.state = {
            shouldNavigate: false,
          };
    }


    addToCart = async (productId, stock) => {

        let userIds = await userId();
      
        if (userIds) {
            if (stock == null || stock == 0) {
                alert("Stock Not Available")
            } else {
                toast.success("Added To Cart");
                try {
                    const response = await this.props.client.mutate({
                        mutation: AddToCartQuery,
                        variables: {
                            shopId: SHOP_ID,
                            productId: Number(productId),
                            userId: userIds,
                            quantity: 1
                        },
                    });
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
        else {
            // window.location.href = "https://you.strackit.com/?redirectto=" + window.location.href;
            this.setState({ shouldNavigate: true });
        }
    }

    makeDecimalPoint(value) {
        try {
            value = value.toFixed(0);
        } catch (error) {
            value = 0;
        }
        return value;
    }

    render() {
        let uniqueProduct = []
        if (this.props.products) {
            uniqueProduct = this.props.products.reduce((accumulator, currentValue) => {
                const existingObject = accumulator.find(item => item?.id === currentValue?.id);
                if (!existingObject) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);
        }
        if (this.state.shouldNavigate) {
            return <Navigate to="/login" />;
          }
        

        return (
            <React.Fragment>
                <div className="grid-container">
                    {uniqueProduct?.map((item) => {
                        if (!item) {
                            return;
                        }
                        console.log("*item*", item);
                        let prize = item?.prize;
                        if (item?.discount > 0) {
                            prize = prize - item.discount;
                        }
                        if (item?.tax > 0) {
                            prize = prize + (prize * item.tax) / 100;
                        }

                        let featureImage = Empty;
                        if (item?.featureImage) {
                            featureImage = "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" + item.featureImage;
                        }
                        let productName = item?.name;
                        try {
                            productName = item?.name.replace(/\s/g, '-');
                            productName = productName.replace(/[^\w\s-]/g, '');
                        } catch (error) {
                        }
                        return (
                            <Card
                                className="hover-container"
                                style={{ marginTop: "1rem", width: "80%",marginBottom:"3%" }}
                            >
                                <CardContent
                                >
                                    {
                                        item?.isAddedToCart?.inCart ?
                                            (
                                                <Link to={"/cart"}>
                                                    <button className="cart-button">
                                                        <BsCart2 size={25} />
                                                    </button>
                                                </Link>
                                            ) :
                                            (
                                                <button
                                                    className="cart-button"
                                                    onClick={() => {
                                                        this.addToCart(item?.id, item?.noStock)
                                                    }}
                                                >
                                                    <BsCart2 size={25} />
                                                </button>
                                            )
                                    }
                                    {this.props.bestSeller ?
                                        <div className="best-seller-tag">
                                            <h5>Best Seller</h5>
                                        </div>
                                        : null}
                                    <Link
                                        to={`/product/Stay-Young/${productName}/${item?.id}`}
                                        className="product-link"
                                        onClick={() => {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        <img src={featureImage} className="product-image" />
                                        <div className="product-info">
                                            <Popup content={item?.name} trigger={<h2 className="product-name">
                                                {item?.name}
                                            </h2>} />

                                            <div className="product-details">
                                                <p className="product-price">
                                                    {item?.discount <= 0 ? "₹ " + this.makeDecimalPoint(prize) : "₹ " + this.makeDecimalPoint(prize)}
                                                </p>
                                                <>
                                                    <p className="discounted-price-text">
                                                        {item?.discount > 0 ? `₹${this.makeDecimalPoint(item.prize+(item.prize*item.tax)/100)}` : ""}
                                                        {/* ₹{item?.productDiscountPrice} */}
                                                    </p>
                                                    <p style={{ marginLeft: "auto", position: "absolute", top: "8%", right: "10%", color: "red" }} className="discount-percentage-text">
                                                        {item?.discount > 0 ? `${((item?.discount / item.prize) * 100).toFixed(2)}%` : ""}
                                                    </p>
                                                </>
                                                {
                                                    item?.noStock == 0 ? 
                                                    <div style={{ color: 'red', fontSize: '14px', top: "8%" }}>Out Of Stock</div> :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}

                </div>
                <Toaster />
            </React.Fragment>
        )
    }
}

export default ProductList;