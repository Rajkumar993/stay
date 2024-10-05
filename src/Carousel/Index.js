import React, { Component } from "react";
import "../Assets/Styles/Carousel.css"
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carouselImage1 from "../Assets/Images/carousel-4.jpg"
import carouselImage2 from "../Assets/Images/carousel-3.jpg"
import carouselImage3 from "../Assets/Images/carousel-4.jpg"
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../env";
import { Link } from 'react-router-dom';
import CardDetails from "../Components/Blogs/CardDetails";


const getBlogs = gql`
  query Blog($filter: blogFilter) {
    Blog(filter: $filter) {
      id
      title
      image
      description
      url
      timestamp
      productName
      shopId
      type
      url
    }
  }
`;
class CarouselImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            sliderImage: [],
            cardProduct: null,
            openDialog: false,
        };
        this.carousel = null;
    }

    componentDidMount() {
        this.getBlogs()
    }

    getBlogs = async () => {
        try {
            const { data } = await this.props.client.query({
                query: getBlogs,
                variables: {
                    filter: {
                        shopId: SHOP_ID,
                    },
                },
            });
            this.setState({ sliderImage: data.Blog, loading: false });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    closeDialog = () => {
        this.setState({ openDialog: false })
    }

    render() {
        return (
            <div className="image-container">
                <Carousel
                    onChange={(index) => this.setState({ selectedIndex: index })}
                    showThumbs={false}
                    showStatus={false}
                    showArrows={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={4000}
                    transitionTime={1000}
                    ref={(carousel) => (this.carousel = carousel)}
                    renderArrowPrev={(clickHandler, hasPrev) => (
                        <div
                            onClick={clickHandler}
                            className="carousel-arrow-prev"
                        >
                            <IoIosArrowBack className="carousel-arrow-icon" />
                        </div>
                    )}
                    renderArrowNext={(clickHandler, hasNext) => (
                        <div
                            onClick={clickHandler}
                            className="carousel-arrow-next"
                        >
                            <IoIosArrowBack className="carousel-arrow-icon rotate-180" />
                        </div>
                    )}
                >
                    {
                        this.state.sliderImage.map((item) => {
                            let url = item.image ? "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" + item.image : carouselImage1;
                            return (
                                <div id="carousel-container"
                                >
                                    <div
                                        to={`/blogs`}
                                        style={{ height: "100%", width: "100%" }}
                                        onClick={() => {
                                            if (item.type == "PRODUCT" && item.productName && item.url) {
                                                let productName = item?.productName.replace(/\s/g, '-');
                                                productName = productName.replace(/[^\w\s-]/g, '');
                                                window.location.href = `/product/Stay-Young/${productName}/${item?.url}`
                                            } else {
                                                window.location.href = "/blogs"
                                            }

                                        }}
                                    >
                                        <img

                                            src={url} style={{ objectFit: "fill", cursor: "pointer" }} className="image-size"></img>
                                    </div> :
                                    <div className="container">
                                        {/* <div className="text-container">
                                            <motion.div
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: false, amount: 0.5 }}
                                                transition={{ duration: 0.8 }}
                                                variants={{
                                                    hidden: { opacity: 0, x: +120 },
                                                    visible: { opacity: 1, x: 0 },
                                                }}
                                                className="subTitle"
                                            >
                                                <b>{item.title}</b>
                                            </motion.div>
                                            <motion.p
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: false, amount: 0.5 }}
                                                transition={{ duration: 0.9 }}
                                                variants={{
                                                    hidden: { opacity: 0, x: +120 },
                                                    visible: { opacity: 1, x: 0 },
                                                }}
                                                style={{ marginTop: "1%", marginBottom: "1%", fontSize: '18px' }}
                                                className="description"
                                            >
                                                {`${item.description.substring(0, 200)}...`}
                                            </motion.p>
                                            <motion.p
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: false, amount: 0.5 }}
                                                transition={{ duration: 0.9 }}
                                                variants={{
                                                    hidden: { opacity: 0, x: +120 },
                                                    visible: { opacity: 1, x: 0 },
                                                }}
                                                className="tag"
                                                style={{ marginBottom: "2%" }}
                                            >
                                                {item.tag}
                                            </motion.p>
                                        </div> */}
                                        {/* <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{ duration: 1, delay: 0.1 }}
                                            variants={{
                                                hidden: { opacity: 0, x: +120 },
                                                visible: { opacity: 1, x: 0 },
                                            }}

                                        >
                                            <div className="button-container">
                                                <span className="absolute-bg"></span>
                                                <span className="absolute-right">
                                                    <svg
                                                        className="svg-icon"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <span className="button-text" >See More</span>
                                            </div>
                                          
                                        </motion.div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
                <CardDetails dialogOpen={this.state.openDialog}
                    closeDialog={this.closeDialog}
                    cardProduct={this.state.cardProduct} />
            </div>
        )
    }
}

export default CarouselImage;