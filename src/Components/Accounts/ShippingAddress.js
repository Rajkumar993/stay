import React, { Component, useState, useEffect } from "react";
import { Grid, Input, Card } from "semantic-ui-react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { gql, useQuery, useMutation } from "@apollo/client";
import userId from "../userId";

const UPDATE_ADDRESS = gql`mutation Address($type: String, $addressId: Int, $userId: Int, $update: Boolean, $country: String, $phone: String, $name: String, $street: String, $city: String, $state: String, $pincode: String) {
    Address(type: $type, id: $addressId, userId: $userId, Update: $update, country: $country, phone: $phone, name: $name, street: $street, city: $city, state: $state, pincode: $pincode) {
      id
      userId
      type
      country
      state
      city
      phone
      pincode
      street
      name
    }
  }`

  const userIdValue = await userId();

export const ShippingAddress = ({ getCreditsRefetch, shippingAddress, currentAddress, getCustomerAddressRefetch }) => {

    const [editAddressDialog, setEditAddressDialog] = useState(false);
    const [editAddressName, setEditAddressName] = useState(null);
    const [editAddressPhone, setEditAddressPhone] = useState(null);
    const [editAddressStreet, setEditAddressStreet] = useState(null);
    const [editAddressState, setEditAddressState] = useState(null);
    const [editAddressCountry, setEditAddressCountry] = useState(null);
    const [editAddressPincode, setEditAddressPincode] = useState(null);
    const [editAddressCity, setEditAddressCity] = useState(null);
    const [editAddressId,setEditAddressId] = useState(null)

    const [updateAddressQuery, { loading: updateAddressQueryLoading, error: updateAddressQueryError }] = useMutation(UPDATE_ADDRESS);

    const updateAddress = () => {
        updateAddressQuery({
            variables: {
                "type": "home",
                "addressId": editAddressId,
                "userId": userIdValue,
                "country": editAddressCountry,
                "phone": editAddressPhone,
                "name": editAddressName,
                "street": editAddressStreet,
                "city": editAddressCity,
                "pincode": editAddressPincode,
                "state": editAddressState,
                "update": true,
            }
        })
            .then((response) => {
                if (getCustomerAddressRefetch) {
                    getCustomerAddressRefetch()
                }
                if(getCreditsRefetch){
                    getCreditsRefetch()
                }
                alert("Address Updated successfully")
                // setShowSpinner(false);
            })
            .catch((mutationError) => {
                // setShowSpinner(false);
                console.log('Mutation error:', mutationError);
            });
    }

    const removeAddress = () => {
        setEditAddressName(null)
        setEditAddressPhone(null)
        setEditAddressStreet(null)
        setEditAddressCity(null)
        setEditAddressPincode(null)
        setEditAddressState(null)
        setEditAddressCountry(null)
        setEditAddressId(null)
    }

    if (!shippingAddress) {
        return;
    }

    return (
        <div >
            {currentAddress ?
                <h4 style={{ width: "65%", textAlign: "justify" }}>Last Delivery Address</h4> : null}
            <Card style={{ width: "95%" }}>
                <Card.Content>
                    <div style={{ textAlign: "end" }}>
                        <Button
                            onClick={() => {
                                setEditAddressDialog(true)
                                setEditAddressName(shippingAddress?.name)
                                setEditAddressPhone(shippingAddress?.phone)
                                setEditAddressStreet(shippingAddress?.street)
                                setEditAddressCity(shippingAddress?.city)
                                setEditAddressPincode(shippingAddress?.pincode)
                                setEditAddressState(shippingAddress?.state)
                                setEditAddressCountry(shippingAddress?.country)
                                setEditAddressId(shippingAddress?.id)
                            }}
                        >Edit</Button>
                    </div>
                    <Grid style={{ padding: "2%", textAlign: "justify" }}>
                        <Grid.Column mobile={16} tablet={8} computer={5}>
                            <span>Name:</span>
                            <span style={{ marginLeft: "3%" }}>{shippingAddress.name}</span>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={5}>
                            <span>Phone</span>
                            <span style={{ marginLeft: "3%" }}>{shippingAddress.phone}</span>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={5}>
                            <span>Address:</span>
                            <span style={{ marginLeft: "3%" }}>{shippingAddress.street}</span>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={5}>
                            <span>State:</span>
                            <span style={{ marginLeft: "3%" }}>{shippingAddress.state}</span>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={5}>
                            <span>Country:</span>
                            <span style={{ marginLeft: "3%" }}>{shippingAddress.country}</span>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={5}>
                            <span>Pincode:</span>
                            <span style={{ marginLeft: "3%" }}>{shippingAddress.pincode}</span>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
            <Dialog variant="outlined"
                open={editAddressDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={() => {
                    setEditAddressDialog(false)
                }}
            >
                <DialogTitle>Add Address</DialogTitle>
                <DialogContent>
                    <div className="customer-number">
                        <div>
                            <label>Name</label>
                            <Input
                                style={{ width: "95%" }}
                                placeholder="Name"
                                value={editAddressName}
                                onChange={(e) => {
                                    setEditAddressName(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <Input type="number"
                                style={{ width: "95%" }}
                                placeholder="Phone Number"
                                value={editAddressPhone}
                                onChange={(e) => {
                                    // setCusomerPhoneNumber(e.target.value)
                                    setEditAddressPhone(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <Input
                                style={{ width: "95%", marginTop: "5%" }}
                                placeholder="Street"
                                value={editAddressStreet}
                                onChange={(e) => {
                                    setEditAddressStreet(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>City</label>
                            <Input
                                style={{ width: "95%", marginTop: "5%" }}
                                placeholder="City"
                                value={editAddressCity}
                                onChange={(e) => {
                                    setEditAddressCity(e.target.value)
                                }}
                            />
                        </div>

                        <div>
                            <label>State</label>
                            <Input
                                style={{ width: "95%" }}
                                placeholder="State"
                                value={editAddressState}
                                onChange={(e) => {
                                    setEditAddressState(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>Country</label>
                            <Input
                                style={{ width: "95%" }}
                                placeholder="Country"
                                value={editAddressCountry}
                                onChange={(e) => {
                                    setEditAddressCountry(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>Pincode</label>
                            <Input type="number"
                                style={{ width: "95%" }}
                                placeholder="Pincode"
                                value={editAddressPincode}
                                onChange={(e) => {
                                    setEditAddressPincode(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: "green", border: "1px solid black" }}
                        onClick={() => {
                              updateAddress()
                              setEditAddressDialog(false);
                        }}
                    >
                        Save
                    </Button>
                    <Button variant="outlined" style={{ color: "red", border: "1px solid black" }}
                        onClick={() => {
                            setEditAddressDialog(false);
                            removeAddress(null)
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}