import React, { Component } from "react";
import { Button, Rating, Form, TextArea } from "semantic-ui-react";
import { gql } from "@apollo/client";
import userId from "../userId";
import { SHOP_ID } from "../../env";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ADD_REVIEW = gql`mutation AddReview($orderId: Int, $userId: Int, $productId: Int, $rating: Int, $review: String) {
  addReview(orderId: $orderId, userId: $userId, productId: $productId, rating: $rating, review: $review) {
    id
    userId
    productId
    orderId
    rating
    review
  }
}`;

const EDIT_REVIEW = gql`mutation editReview($orderId: Int, $userId: Int, $productId: Int, $rating: Int, $review: String) {
  addReview(orderId: $orderId, userId: $userId, productId: $productId, rating: $rating, review: $review) {
    id
    userId
    productId
    orderId
    rating
    review
  }
}`;

const GetProductReviews = gql`query c($filters: reviewFilter) {
  productReviews(filters: $filters) {
    id
    orderId
    productId
    rating
    review
    userId
    UserInfo {
      customerId
      customerName
    }
  }
}`

class ProductReview extends Component {

    state = {

    }

    getProductReview = async () => {
        let userIds = await userId();
        let productId = this.convertIntoNumber(this.props.order.Products[0].id);
        console.log(productId);
        console.log(SHOP_ID);
        console.log(userIds);
        console.log(this.props.order.masterId);
        console.log("-----***-----***----");
        await this.props.client.query({
            query: GetProductReviews,
            variables: {
                filters: {
                    productId: Number(productId),
                    orderId: this.props.order.masterId
                }
            }
        }).then((res) => {
            this.setState({ 
                addRating: res.data.productReviews[res.data.productReviews.length - 1].rating, 
                review: res.data.productReviews[res.data.productReviews.length - 1].review, 
                editid: res.data.productReviews[res.data.productReviews.length - 1].id,
                edit: true
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    convertIntoNumber = (value) => {
        try {
            value = Number(value);
        } catch (error) {
            value = 0;
        }
        return value;
    }

    editRating = async () => {
        let { addRating, review } = this.state;
        let userIds = await userId();
        let productId = this.convertIntoNumber(this.props.order.Products[0].id);
        try {
            const response = await this.props.client.mutate({
                mutation: ADD_REVIEW,
                variables: {
                    orderId: this.props.order.masterId,
                    userId: userIds,
                    productId: productId,
                    rating: addRating, 
                    review: review
                },
            });
            if(response.data.addReview.productId == productId) {
                alert('Review added successfully!!!');
                this.setState({ edit: false, addReview: false, addRating: 0, review: "" })
            }
            else {
                alert("Error")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    addProductReview = async () => {
        let userIds = await userId();
        let productId = this.convertIntoNumber(this.props.order.Products[0].id);
        if (this.state.edit) {
            this.editRating();
            return;
        }
        try {
            const response = await this.props.client.mutate({
                mutation: ADD_REVIEW,
                variables: {
                    orderId: this.props.order.masterId,
                    userId: userIds,
                    productId: productId,
                    rating: this.state.addRating, 
                    review: this.state.review
                },
            });
            if(response.data.addReview.productId == productId) {
                alert('Review added successfully!!!');
                this.setState({ edit: false, addReview: false, addRating: 0, review: "" })
            }
            else {
                alert("Error")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    handleRate = (e, { rating, maxRating }) => {
       this.setState({ addRating: rating })
    }

    render() {
        return (
            <div>
                <u style={{ cursor: 'pointer' }} onClick={ () => { this.getProductReview(); this.setState({ addReview: true }); } }>Add Review</u>
                <Dialog
                    open={this.state.addReview}
                    fullWidth={true}
                    maxWidth={"sm"}
                    onClose={ () => this.setState({ addReview: false })}
                >
                    <DialogTitle>Add Review</DialogTitle>
                    <DialogContent>
                        <Rating rating={this.state.addRating} icon='star' maxRating={5} onRate={this.handleRate} />
                        <br/><br/>
                        <Form>
                            <TextArea value={this.state.review} onChange={ (event) => this.setState({ review: event.target.value }) } 
                            placeholder='Review' />
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({ addReview: false })}>Cancel</Button>
                        <Button onClick={ () => this.addProductReview() }>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ProductReview;