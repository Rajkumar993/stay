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



class AllCategories extends Component {

    

    render() {
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
                    <div class="categories-inner-container">
                        {categories.map((item) => {
                            return (
                                <Link to={item.to} className="categories-image-link">
                                    <img className="categories-image" src={item.image} ></img>
                                    <p className="categories-name">{item.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div >
        )
    }
}

export default AllCategories;