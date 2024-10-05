import { gql } from "@apollo/client";
import React, { Component } from "react";
import "../../Assets/Styles/Order.css";
import { SHOP_ID } from "../../env";
import P1 from "../../Assets/Images/p1.jpg";
import Paper from "@mui/material/Paper";
import { Card, Table, Grid } from "semantic-ui-react";
import Loading from "../../Loading";
import userId from "../userId";
// import ProductReview from './ProductReview';
const GET_ORDER_ITEMS_QUERY = gql`
  query OrderHistory($filter: orders) {
    orderHistory(filter: $filter) {
      shopId
      customerId
      customerName
      customerMobile
      id
      customerAddress
      voucherNo
      orderType
      customerGstin
      userOrder
      pickuptime
      rating
      feedback
      paymentInfo
      orderdetails {
        id
        masterId
        stockId
        quantity
        status
        price
        tax
        dnp
        discount
        totalPrice
        Products {
          name
          prize
          discount
          addedon
          tax
        }
      }
    }
  }
`;

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      orderHistory: [],
    };
  }

  componentDidMount() {
    this.getOrderItems();
  }

  getOrderItems = async () => {
    let userIds = await userId();
    this.setState({ loading: true });
    try {
      let { data } = await this.props.client.query({
        query: GET_ORDER_ITEMS_QUERY,
        variables: {
          filter: {
            shopId: SHOP_ID,
            userId: userIds,
          },
        },
      });
      if (data.orderHistory) {
        this.setState({
          orderHistory: data.orderHistory,
          loading: false,
        });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error("Error:", error);
    }
  };
  render() {
    return (
      <div className="order-container">
        <h2 style={{ textAlign: "center" }}>My Order</h2>
        {this.state.loading ? <Loading loading={this.state.loading} /> : null }      
        <div>
          <div className="order-item-container">
            <Grid>
              <Grid.Column mobile={16} table={16} computer={12}>
                {this.state.orderHistory.map((item) => {
                  let x = [];
                  return (
                    <Card fluid>
                      <Card.Content>
                        <Grid>
                          <Grid.Column mobile={8} tablet={8} computer={10}>
                            <h3>{`Order : #${item.id}`}</h3>
                            <p>{`Invoice No: ${item.voucherNo}`}</p>
                            <p>{`Total Items : ${item.orderdetails.length}`}</p>
                          </Grid.Column>
                          <Grid.Column mobile={8} tablet={8} computer={6}>
                            <b>Delivery Details</b>
                            <p>{item.customerName}</p>
                            <p>{item.customerMobile}</p>
                            <b>{`Address`}</b>
                            <p>{item.customerAddress}</p>
                          </Grid.Column>
                        </Grid>
                      </Card.Content>
                      <Card.Content extra>
                        {item.orderdetails.map((c) => {
                          let product = c.Products[0];
                          x.push(
                            <Table.Row>
                              <Table.Cell style={{}}>
                                {product?.name}
                              </Table.Cell>
                              <Table.Cell>{c.quantity}</Table.Cell>
                              <Table.Cell>
                                {c.totalPrice}
                              </Table.Cell>
                              <Table.Cell>
                                {c.status == 1 || c.status == "1"
                                  ? "Waiting For Seller Accept"
                                  : c.status == 2 || c.status == "2"
                                  ? "Product Accepted"
                                  : c.status == 3 || c.status == "3"
                                  ? "Product Packing"
                                  : c.status == 4 || c.status == "4"
                                  ? "Product Shipping"
                                  : "Product Delivered"}
                                  scscsc
                              </Table.Cell>
                              <Table.Cell>
                                {/* <ProductReview productId={1} client={this.props.client} /> */}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                        <Table celled style={{ width: "100%" }}>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell style={{ width: "60%" }}>
                                Product Name
                              </Table.HeaderCell>
                              <Table.HeaderCell style={{ width: "10%" }}>
                                Qty
                              </Table.HeaderCell>
                              <Table.HeaderCell style={{ width: "10%" }}>
                                Price
                              </Table.HeaderCell>
                              <Table.HeaderCell style={{ width: "20%" }}>
                                Status
                              </Table.HeaderCell>
                              <Table.HeaderCell style={{ width: "20%" }}>
                                Review
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>{x}</Table.Body>
                        </Table>
                        <p style={{marginLeft: '1px', fontSize: '12px'}}>If you want to cancel this order place contact shop and refund will process next 3 to 5 working days.</p>
                      </Card.Content>
                    </Card>
                  );
                })}
              </Grid.Column>
            </Grid>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Order;
