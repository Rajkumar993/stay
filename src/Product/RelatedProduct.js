import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import P1 from "../Assets/Images/p1.jpg"
import { BsCart2 } from "react-icons/bs";
import { Popup } from 'semantic-ui-react'
import { gql } from "@apollo/client";
import { SHOP_ID, DOMAIN } from "../env";
import userId from "../Components/userId";
import Empty from "../Assets/Images/empty.jpg";
import { Link,Navigate  } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AddToCartQuery = gql`mutation Mutation($productId: Int, $shopId: Int, $userId: Int) {
    Cart(productId: $productId, shopId: $shopId, userId: $userId) {
      shopId
      productId
      userId
    }
  }`


const GetShopQuery = gql`
  query Products($filter: productfilter) {
    products(filter: $filter) {
      id
      number
      name
      localName
      hsnCode
      tax
      prize
      dnp
      noStock
      minStock
      description
      specification
      shopId
      featureImage
      mastercategory
      category
      categoryId
      publish
      viewPrice
      discount
      offerends
      views
      isOnline
      productId
      productCategoryId
      barcode
      lastUpdate
      addedon
    }
  }
`;

class RelatedProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showIcons: true,
            showBestSellerTag: true,
            products: [],
            shouldNavigate: false
        };

       
    }

    addToCart = async (productId, stock) => {
        let userIds = await userId();
        if (userIds) {
            if (stock == null || stock == 0) {
                alert("Stock Not Available")
            } else {
                try {
                    alert("Product Added To Cart")
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
    componentDidMount() {
        if (this.props.userId) {
            this.getProducts(this.props.userId);
        }
    }

    componentDidUpdate(props) {
        if (props.userId != this.props.userId) {
            this.getProducts(this.props.userId);
        }
    }

    getProducts = async (userId) => {
        let userIds = await userId();
        try {
            const { data } = await this.props.client.query({
                query: GetShopQuery,
                variables: {
                    filter: {
                        shopId: SHOP_ID,
                        userId: userIds
                    },
                },
            });
            this.setState({ products: data.products })
        } catch (error) {
            alert(error)
        }
    }

    makeDecimalPoint(value) {
        try {
            value = value.toFixed(2);
        } catch (error) {
            value = 0;
        }
        return value;
    }


    render() {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            },
        };
        if (this.state.shouldNavigate) {
            return <Navigate to="/login" />;
          }
        return (
            <div className="related-product-container">
                <h2 className="re-headting">
                    You Might Also Like
                </h2>
                <Carousel
                    autoPlay={true}
                    ssr={true}
                    containerClass="myCarouselContainer"
                    itemClass="myCarouselItem"
                    autoPlaySpeed={2500}
                    infinite={true}
                    responsive={responsive}
                >
                    {this.state.products.map((item) => {
                        if(!item){
                            return null;
                        }
                        let prize = item.prize - item.discount;
                        prize = prize + ((prize * item.tax) / 100);
                        let featureImage = P1;
                        if (item.featureImage) {
                            featureImage = "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" + item.featureImage;
                        }
                        let productName = item.name;
                        try {
                            productName = item.name.replace(/\s/g, '-');
                            productName = productName.replace(/[^\w\s-]/g, '');
                        } catch (error) {
                        }
                        return (
                            <div
                                onMouseOver={() => this.setState({ showIcons: true })}
                                onMouseLeave={() => this.setState({ showIcons: false })}
                                className="related-prodcut-list">
                                {this.state.showIcons && (
                                    <button
                                        onClick={() => { this.addToCart(item.productId, item.noStock) }}
                                        className="related-product-cart"
                                    >
                                        <BsCart2 size={25} />
                                    </button>
                                )}
                                <Link
                                    to={`/product/Stay-Young/${productName}/${item.id}`}
                                    className="product-link"
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    <img style={{ width: "20rem", height: "20rem" }} src={featureImage} />
                                    <div className="related-product-details">
                                        <Popup content={item.name} trigger={<h2 className="related-product-heading">{item.name}</h2>} />

                                        <div className="product-price-container">
                                            <p className="related-product-price"> {item.discount <= 0 ? "₹ " + this.makeDecimalPoint(prize) : "₹ " + this.makeDecimalPoint(prize)}</p>
                                            {/* {product?.price !== product?.discountedPrice && ( */}
                                            <>
                                                <p className="product-discount-price">
                                                    {item.discount > 0 ? `₹${this.makeDecimalPoint(item.prize+(item.prize*item.tax)/100)}` : ""}
                                                </p>
                                                <p className="product-offer-price" style={{position:"absolute",top:"28px",right:"4px",color:"red"}}>
                                                    {item.discount > 0 ? `${((item.discount / item.prize) * 100).toFixed(2)}%` : ""}
                                                </p>
                                            </>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel>
                <Toaster />
            </div>
        )
    }
}

export default RelatedProduct;

// {products.map((item)=>{
//     return(
//         <img src={item.url} />
//     )
//    })}