import React, { Component } from "react";
import ProductList from "../../AllProducts/ProductsList";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../../env";
import Loading from "../../Loading";
import userId from '../userId';

const GetTopProducts = gql`
query TopProducts($filter: top) {
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

const GET_HOTDEALS_PRODUCT_QUERY = gql`query OfferProducts($filter: offer) {
    offerProducts(filter: $filter) {
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

//"OR5984"
class BestSeller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topProducts: [],
            loading: false,
        }
    }

    async componentDidMount() {
        if (this.props.title == "Hot Deals") {
            this.getOfferProducts();
        } else {
            this.getShopOptions()
        }
    }

    getOfferProducts = async () => {
        let user = await userId();
        this.setState({ loading: true })
        try {
            const { data } = await this.props.client.query({
                query: GET_HOTDEALS_PRODUCT_QUERY,
                variables: {
                    filter: {
                        shopId: SHOP_ID,
                        userId: user
                    },
                },
            });
            this.setState({ topProducts: data.offerProducts, loading: false })
        } catch (error) {
            this.setState({ loading: false })
            console.error("Error:", error);
        }
    }

    getShopOptions = async () => {
        let user = await userId();
        this.setState({ loading: true })
        try {
            const { data } = await this.props.client.query({
                query: GetTopProducts,
                variables: {
                    filter: {
                        shopId: SHOP_ID,
                        userId: user
                    },
                },
            });
            console.log("data",data);
            this.setState({ topProducts: data.topProducts, loading: false })
        } catch (error) {
            this.setState({ loading: false })
            console.error("Error:", error);
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        return (
            <div>
                <h2 style={{ textAlign: "center", marginTop: "5%", marginBottom: "4%" }}>{this.props.title}</h2>
                <ProductList bestSeller={this.props.bestSeller} products={this.state.topProducts} client={this.props.client} />
            </div>
        )
    }
}

export default BestSeller;