import React, { Component, useEffect, useState } from "react";
import userId from "../userId";
import { gql, useQuery } from "@apollo/client";
import { SHOP_ID } from "../../env";
import ProductList from "../../AllProducts/ProductsList";
import Loading from "../../Loading";
import { useParams } from "react-router-dom";


const GET_PRODUCT_BY_PRICE_QUERY = gql`query ProductByPrice($filter: pricefilter) {
    productByPrice(filter: $filter) {
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
        isAddedToCart {
          inCart
        }
    }
  }
`;

let user = await userId();
const ProductByPrice = ({ price, client }) => {
 
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    // const value = useParams()['*'].split("/");
    // console.log("****", value);
    const { loading: getProductsLoading, error: getProductsError, data: getProductsData, refetch: getProductsRefetch } = useQuery(GET_PRODUCT_BY_PRICE_QUERY, {
        variables: {
            "filter": {
                price: Number(price),
                userId: user,
                shopId: SHOP_ID,

            }
        },
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling animation
        });
    }, [])

    useEffect(() => {
        if (getProductsLoading) {
            setLoading(true)
        }
        if (getProductsData) {
            setLoading(false)
            setProducts(getProductsData.productByPrice)
        }
    }, [getProductsData, getProductsLoading])



    if (loading) {
        return (
            <center><Loading /></center>
        )
    }

    if (!products) {
        return <div></div>;
    }

    return (
        <React.Fragment>
            <div id="BestSeller" >
                <div className="product-container">
                    <h2 class="product-heading">Product Under Rs {price}</h2>
                    {/* {this.props.discription ? <p class="product-paragraph">
                    Discover our carefully curated collection of Korean skin care products
                    that are designed to provide you with healthy, glowing, and radiant
                    skin.
                </p> : ""} */}
                    <br />
                </div>
                {loading ? <Loading /> : null}
                <ProductList products={products} client={client} />
            </div>

        </React.Fragment>

    )
}

export default ProductByPrice;