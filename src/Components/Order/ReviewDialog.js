// ReviewDialog.js
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { gql, useMutation } from "@apollo/client";
import client from "../../apolloClient";
import Loading from "../../Loading";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
function ReviewDialog({ orderId, productId, Review }) {
  const [alert, setAlert] = useState(null);
  const { review, rating } = Review[0];
  const [value, setValue] = React.useState(rating);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [revieww, setReview] = React.useState(review);
  const [isEdit, setEdit] = useState(false);
  useEffect(() => {
      setReview(Review[Review.length - 1].review);
      setValue(Review[Review.length - 1].rating);

  },[Review]);

  const handleClickOpen = (e) => {
    if (e.target.innerHTML == "Edit Review" || revieww !== "") {
      setEdit(true);
      setOpen(true);
    }else{
    setOpen(true);
    setEdit(false);
    }
  };
  //Mutation
  const EDIT_REVIEW_Mutation = gql`
    mutation EditReview(
      $orderId: Int
      $userId: Int
      $rating: Int
      $productId: Int
      $review: String
    ) {
      editReview(
        orderId: $orderId
        userId: $userId
        rating: $rating
        productId: $productId
        review: $review
      ) {
        id
        productId
        orderId
        rating
        review
        userId
      }
    }
  `;
  const ADD_REVIEW = gql`
    mutation addReview(
      $userId: Int
      $productId: Int
      $rating: Int
      $review: String
      $orderId: Int
    ) {
      addReview(
        userId: $userId
        productId: $productId
        rating: $rating
        review: $review
        orderId: $orderId
      ) {
        id
        orderId
        productId
        rating
        userId
        review
      }
    }
  `;
  const [
    addReview,
    { loading: addQuantityLoadingg, error: addQuantityErrorr },
  ] = useMutation(ADD_REVIEW);
  const [editReview, { loading: addQuantityLoading, error: addQuantityError }] =
    useMutation(EDIT_REVIEW_Mutation);
  const editReviews = async (review, value) => {
    editReview({
      variables: {
        userId: 1,
        productId: productId,
        rating: value,
        review: revieww,
        orderId: orderId,
      },
    })
      .then(async (response) => {
        console.log(response)
        window.alert("Review Edited Successfully");
        setReview(revieww);
        setValue(value);
      })
      .catch(async (mutationError) => {
        // Handle any errors that occurred during the mutation.
        console.error("Mutation error:", mutationError);
        window.alert("something went wrong try again");
        setReview(revieww);
        setValue(value);
      });
  };
  const addReviews = (review, value) => {
    addReview({
      variables: {
        userId: 1,
        productId: productId,
        rating: value,
        review: review,
        orderId: orderId,
      },
    })
      .then((response) => {
        window.alert("Review Added Successfully");
        setReview(revieww);
        setValue(value);
      })
      .catch((mutationError) => {
        // Handle any errors that occurred during the mutation.

        window.alert("something went wrong try again");
        setReview(revieww);
        setValue(value);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (e) => {
    setReview(e.target.value);
  };
  const saveAndClose = async (e) => {
    if (isEdit && revieww != "") {
      await editReviews(revieww, value);
      setOpen(false);
      return;
    }
    await addReviews(revieww, value);
    setReview(revieww);
    setValue(value);
    setOpen(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  return (
    <React.Fragment>
      <>
        <button className="product-autocart" onClick={handleClickOpen}>
          {revieww == "" ? `Review` : `Edit Review`}
        </button>
      </>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <Rating
            style={{ marginBottom: "20px" }}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <textarea
            value={revieww}
            className="text-area"
            maxlength="500"
            onChange={(e) => {
              handleSave(e);
            }}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button
            class="product-autocart"
            onClick={(e) => {
              e.preventDefault();
              saveAndClose(e);
            }}
          >
            Save
          </Button>
          <Button class="product-autocart" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ReviewDialog;
