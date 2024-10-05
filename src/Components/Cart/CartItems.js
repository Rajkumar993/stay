import React, { Component, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../../Assets/Styles/Cart.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { gql, useMutation } from "@apollo/client";
import { SHOP_ID } from "../../env";
import { toast, Toaster } from "react-hot-toast";
import userId from "../userId";
import Empty from "../../Assets/Images/empty.jpg";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Popup } from "semantic-ui-react";

// const DELETE_ITEM_QUERY = 
const DELETE_Item = gql`
mutation Mutation($delete: Boolean, $productId: Int, $userId: Int, $shopId: Int) {
    Cart(Delete: $delete, productId: $productId, userId: $userId, shopId: $shopId) {
      productId
      userId
      shopId
    }
  }
`

const ADD_QUANTITY = gql`
mutation Cart($userId: Int, $productId: Int, $quantity: Int, $shopId: Int, $update: Boolean) {
    Cart(userId: $userId, productId: $productId, quantity: $quantity, shopId: $shopId, Update: $update) {
        id
        productId
        quantity
        shopId
        userId
    }
}
`

const userIdValue = await userId();

const CartItems = ({ item, getCartProductRefetch,deleteData }) => {
    const [openAlert, setAlert] = useState(false);
    const [deleteItemName, setDeleteItemName] = useState(null)
    const [quantity, setQuantity] = useState(item.quantity);

    const [deleteItem, { loading: deleteItemLoading, error: deleteItemError }] = useMutation(DELETE_Item);
    const [addQuantity, { loading: addQuantityLoading, error: addQuantityError }] = useMutation(ADD_QUANTITY);
    const handleDelete= (event) =>{
        event.preventDefault();
        deleteData(item);
    }
    // useEffect(()=>{
    //     setQuantity(item.quantity)
    // },[item])
    const deleteProduct = (productId) => {
        deleteItem({
            variables: {
                delete: true,
                shopId: SHOP_ID,
                productId: productId,
                userId: userIdValue,
            },
        })
            .then((response) => {
                if (getCartProductRefetch) {
                    getCartProductRefetch()
                }

            })
            .catch((mutationError) => {
                // Handle any errors that occurred during the mutation.
                console.error('Mutation error:', mutationError);
            });
    }

    const updateCart = (qty, productId) => {
        qty = Number(qty);
        addQuantity({
            variables: {
                userId: userIdValue,
                productId: productId,
                quantity: qty,
                shopId: SHOP_ID,
                update: true
            },
        })
            .then((response) => {
                if (getCartProductRefetch) {
                    getCartProductRefetch()
                }

            })
            .catch((mutationError) => {
                // Handle any errors that occurred during the mutation.
                console.error('Mutation error:', mutationError);
            });
        // window.location.reload();
    }

    let featureImage = Empty;
    if (item.featureImage) {
        featureImage =
            "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" +
            item.featureImage;
    }

    let prize = item?.prize;
    if (item?.Discount > 0) {
        prize = prize - item.Discount;
    }
    if (item?.tax > 0) {
        prize = prize + (prize * item?.tax) / 100;
    }

    let productName;

    if (item) {
        productName = item?.name.replace(/\s/g, '-');
        productName = productName.replace(/[^\w\s-]/g, '');
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className="cart-item-container" >
            <Link
                to={`/product/Stay-Young/${productName}/${item?.productId}`}
                className="cart-item-image"
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                <img style={{ width: "100%" }} className="cart-item-image" src={featureImage} />
            </Link>
            <div className="cart-item-details">
                <div style={{ display: "grid", gridTemplateColumns: "89% 10%" }}>
                    <Link
                        to={`/product/Stay-Young/${productName}/${item?.productId}`}
                        // className="product-link"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <div style={{ fontSize: '20px', color: '#000', width: '100%' }}>
                            <Popup
                                content={item?.name} trigger={
                                    <div className="cart-item-name">{item?.name}</div>
                                }
                            />

                            <br />
                            <br />
                            <b>
                                ₹{prize.toFixed(0)}
                            </b>
                            {item.Discount ? <b className="item-discount-amount">
                                
                                ₹{Number((item.prize + (item.prize * item?.tax) / 100).toFixed(0))}
                            </b> : null}
                            <br />
                            <br />
                        </div>
                    </Link>
                    <div className="cart-item-price" >
                        <button
                            style={{ border: 'none', backgroundColor: 'white', cursor: "pointer" }}
                            onClick={(e) => {
                                setDeleteItemName(item)
                                setAlert(true);
                                handleDelete(e);
                            }}
                        >
                            <RiDeleteBin6Line className="card-item-delete" />
                        </button>
                    </div>
                </div>

                <div className="item-quantity-container">
                    <div
                        style={{
                            color: 'rgba(0, 0, 0, 0.5)',
                            fontSize: '1rem',
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <h4 style={{ fontSize: '0.9rem', textAlign: 'center', paddingTop: '5%' }}>Quantity:</h4>
                        <select
                            value={quantity}
                            onChange={(e) => {
                                if (item?.noStock >= e.target.value) {
                                    handleDelete(e);
                                    setQuantity(e.target.value);
                                    updateCart(e.target.value, item.productId);
                                } else {
                                    alert("Check Number Of Stocks Available")
                                }

                            }}
                            className="cart-item-options"
                        >
                            {[...Array(15).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div
                    style={{
                        color: 'rgba(0, 0, 0, 0.5)',
                        fontSize: '1rem',
                        display: 'flex',
                        gap: '1rem',
                    }}
                >
                    <h4 style={{ fontSize: '0.9rem', textAlign: 'center', paddingTop: '5%' }}>No Of Stocks:{item?.noStock ? item.noStock : 0}</h4>

                </div>
                <Toaster />
            </div>
            <Dialog
                // fullScreen={fullScreen}
                sx={{ '& .MuiDialog-paper': { maxHeight: 185 } }}
                open={openAlert}
                onClose={() => { setAlert(false) }}
            // aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Confirmation Message
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: "black", color: "white" }} autoFocus onClick={() => {
                        setAlert(false)
                    }}>
                        CLOSE
                    </Button>
                    <Button style={{ backgroundColor: "black", color: "white" }} onClick={() => {
                        setAlert(false)
                        deleteProduct(deleteItemName.productId);

                    }} autoFocus>
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default CartItems;