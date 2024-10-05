import React, { Component } from "react";
import "../Assets/Styles/ProductShow.css"
import ProductList from "./ProductsList";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../env";
import { Input } from 'semantic-ui-react'
import userId from '../Components/userId';
import Loading from "../Loading";


const GET_PRODUCT_QUERY = gql`query TopProducts($filter: top) {
    topProducts(filter: $filter) {
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



class ProductShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            searchedProduct: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        let user = await userId();
        try {
            this.setState({ loading: true })
            const { data } = await this.props.client.query({
                query: GET_PRODUCT_QUERY,
                variables: {
                    filter: {
                        userId: user,
                        shopId: SHOP_ID,
                    },
                },
            });
            if (data.topProducts) {
                this.setState({ Products: data.topProducts.slice(0, 10), loading: false })
            }

        } catch (error) {
            this.setState({ loading: false })
            console.error("Error:", error);
        }
    }

    render() {
        let products = this.state.Products;
        return (
            <React.Fragment>
                <div id="BestSeller" >
                    <div className="product-container">
                        <h2 class="product-heading">Best Seller</h2>
                        {this.props.discription ? <p class="product-paragraph">
                            Discover our carefully curated collection of Korean skin care products
                            that are designed to provide you with healthy, glowing, and radiant
                            skin.
                        </p> : ""}
                        <br />
                    </div>
                    {this.state.loading ? <Loading /> : null}
                    <ProductList bestSeller={this.props.bestSeller} products={products} client={this.props.client} />
                </div>

            </React.Fragment>
        )
    }
}

export default ProductShow;