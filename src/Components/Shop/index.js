import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Segment, Image } from "semantic-ui-react";
import AllCategories from "../../AllCategories";
import CarouselImage from "../../Carousel/Index";
import Coupon from "../../Coupon";
import Footer from "../../Footer";
import BestSeller from './bestSeller';
import ProductByPrice from "./ProductByPrice";
import OfferImage from "../../Assets/Images/offer.png";
import "../../Assets/Styles/Offer.css";
import Image999 from '../../Assets/Images/999.jpg';
import Image1499 from '../../Assets/Images/1499.jpg'
class Shop extends Component {

    render() {
        window.scrollTo(0, 0)
        return (
            <React.Fragment>
                <CarouselImage client={this.props.client} />
                <AllCategories client={this.props.client} />
                {/* <ProductShow discription="true" bestSeller="true"  client={this.props.client}/> */}
                {/* <Coupon /> */}
                <BestSeller discription="true" bestSeller="true" client={this.props.client} />
                <Grid id="image-container">
                    <Grid.Column mobile={15} tablet={8} computer={8}>
                        <Link to={`/product-under-999`}>
                            <Image id="images-offer" style={{ width: '100%' }} src={Image999}  />
                        </Link>
                    </Grid.Column>
                    <Grid.Column mobile={15} tablet={8} computer={8}>
                        <Link to={`/product-under-1499`}>
                            <Image id="images-offer" style={{ width: '100%' }} src={Image1499}  />
                        </Link>
                    </Grid.Column>
                </Grid>
                {/* <ProductByPrice client={this.props.client} price='499' />
                <ProductByPrice client={this.props.client} price='1499' /> */}
            </React.Fragment>
        )
    }
}

export default Shop;