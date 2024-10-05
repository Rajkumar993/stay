import React, { Component } from "react";
import userId from "../userId";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../../env";
import ProductList from "../../AllProducts/ProductsList";
import Loading from "../../Loading";

const GET_SEARCHED_PRODUCT = gql`query SearchProducts($filter: searchfilter) {
    searchProducts(filter: $filter) {
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
  `
const GET_PRODUCT_QUERY = gql`query Products($filter: productfilter) {
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

    componentDidUpdate(prevProps) {
        if (this.props.searchKeyword !== prevProps.searchKeyword) {
            this.getSearchedProduct();
        }
    }

    componentWillUnmount() {
        if (this.props.clearSearchKeyWord) {
            this.props.clearSearchKeyWord()
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
            if (data.products) {
                this.setState({ products: data.products, loading: false })
            }

        } catch (error) {
            this.setState({ loading: false })
            console.error("Error:", error);
        }
    }

    getSearchedProduct = async () => {
        let user = await userId();
        let { searchKeyword } = this.props;
        if (searchKeyword && searchKeyword.length > 2) {
            this.setState({ loading: true })
            try {
                const { data } = await this.props.client.query({
                    query: GET_SEARCHED_PRODUCT,
                    variables: {
                        filter: {
                            keyWord: searchKeyword,
                            userId: user,
                            shopId: SHOP_ID
                        },
                    },
                });
                this.setState({ searchedProduct: data.searchProducts, search: searchKeyword, loading: false })
            } catch (error) {
                this.setState({ loading: false })
                alert(error)
            }
        }
        else {
            this.setState({ search: searchKeyword, searchedProduct: [] })
        }

    }



    render() {
        let { searchKeyword } = this.props;
        if (this.state.loading) {
            return (
                <center><Loading /></center>
            )
        }
        return (
            <div style={{ marginTop: "4%" }}>
                {searchKeyword && searchKeyword.length > 2 ?
                    <ProductList products={this.state.searchedProduct} client={this.props.client} /> : null}
                {this.state.searchedProduct.length <= 0 ? !searchKeyword || searchKeyword?.length <= 2 ? <center><h3 style={{ margin: "auto", marginBottom: "5%" }}>Search Product</h3></center>: null : null}
                {searchKeyword && searchKeyword.length > 2 && this.state.searchedProduct.length <= 0 ?<center><h3 style={{ margin: "auto", marginBottom: "5%" }}>Products Not Available</h3></center> : null}
            </div>
        )
    }
}

export default SearchProduct;