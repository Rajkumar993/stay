import React, { Component } from "react";
import userId from "../userId";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../../env";
import ProductList from "../../AllProducts/ProductsList";
import Loading from "../../Loading";
import ProductByPrice from "./ProductByPrice";

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



class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedProduct: [],
            loading: false,
            products: [],
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
                this.setState({ products: data.topProducts.slice(0, 10), loading: false })
            }

        } catch (error) {
            this.setState({ loading: false })
            console.error("Error:", error);
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <center><Loading /></center>
            )
        }
        return (
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
                    <ProductList bestSeller="true" products={this.state.products} client={this.props.client} />
                    
                </div>
        )
    }
}

export default SearchProduct;