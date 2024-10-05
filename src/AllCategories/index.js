import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../Assets/Styles/AllCategories.css";
import { BsArrowRight } from "react-icons/bs";
import P1 from "../Assets/Images/Cleanser.jpg"
import P3 from "../Assets/Images/Toner.jpg"
import P4 from "../Assets/Images/Serum.jpg"
import P5 from "../Assets/Images/SunCream.jpg"
import Requil from "../Assets/Images/Requil.jpg"
import AllOver from "../Assets/Images/AllOver.jpg"
import Cream from "../Assets/Images/Cream.jpg"
import { gql } from "@apollo/client";
import { SHOP_ID, DOMAIN } from "../env";

const GetShopQuery = gql`
  query MasterCategories($filter: MasterCategoryInput) {
    masterCategories(filter: $filter) {
      id
      shopId
      category
      position
      image
      status
      addedon
    }
  }
`;


class AllCategories extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this.getShopOptions();
    }

    sortByKeyAscending(array, keyName) {
        return [...array].sort((a, b) => a[keyName] - b[keyName]);
    }

    getShopOptions = async () => {
        try {
            let { data } = await this.props.client.query({
                query: GetShopQuery,
                variables: {
                filter: {
                    shopId: SHOP_ID,
                },
                },
            });
            let masterCategories = data.masterCategories;
            masterCategories = this.sortByKeyAscending(masterCategories, "position");
            let arr = [];
            masterCategories.map((c) => {
                if (c.image != "") {
                    arr.push(c)
                }
            })
            this.setState({ categories: arr })
        }
        catch(e) {
            alert(e)
        }
    };


    render() {
        let categoriesArr = this.state.categories;
        let categories = [
            {
                image: P1,
                name: "Cleanser",
                to: "/category/Cleanser"
            },
            
            {
                image: P4,
                name: "Serum",
                to: "/category/Serum"
            },
            {
                image: P3,
                name: "Toner",
                to: "/category/Toner"
            },
            {
                image: Cream,
                name: "Moisturizer",
                to: "/category/Moisturizer"
            },
            {
                image: P5,
                name: "Sun Screen",
                to: "/category/Sunscreen"
            },
            {
                image: Requil,
                name: "Hair care",
                to: "/category/Shampoo"
            },
            {
                image: AllOver,
                name: "Body care",
                to: "/product/Stay-Young/Supple-Preparation-All-Over-Lotion-250ml/7717"
            },


        ]
        return (
            <div className="categories-container">
                <div className="categories-content">
                    <h2 className="categories-title">
                        Top Categories
                    </h2>
                    <p className="categories-para">
                    Explore more from our collection.
                    </p>
                    {/* <button className="categories-button">
                        Explore More
                        <span className="categories-icon">
                            <BsArrowRight />
                        </span>
                    </button> */}
                </div>
                <div className="categories-image-container">
                    {/* <div class="categories-inner-container">
                        {categories.map((item) => {
                            return (
                                <Link to={item.to} className="categories-image-link">
                                    <img className="categories-image" src={item.image} ></img>
                                    <p className="categories-name">{item.name}</p>
                                </Link>
                            )
                        })}
                    </div> */}
                    <div class="categories-inner-container">
                        {categoriesArr.map((item) => {
                            return (
                                <Link to={`https://stayyoung.co.in/category/${item.category}`} className="categories-image-link">
                                    <img className="categories-image" src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${item.image}`} ></img>
                                    <p className="categories-name">{item.category}</p>
                                </Link>
                            )
                        })}
                        <Link to={`https://stayyoung.co.in/product/Stay-Young/Supple-Preparation-All-Over-Lotion-250ml/7717`} className="categories-image-link">
                            <img className="categories-image" src={AllOver} ></img>
                            <p className="categories-name">Body care</p>
                        </Link>
                    </div>


                    
                </div>
            </div >
        )
    }
}

export default AllCategories;