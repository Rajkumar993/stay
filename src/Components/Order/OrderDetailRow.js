// OrderDetailRow.js
import React, { useState } from "react";
import { Table, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReviewDialog from "./ReviewDialog";
import OrderDetails from "./OrderDetails";

function OrderDetailRow({
  productReviews,
  orderId,
  product,
  productId,
  stockId,
  quantity,
  totalPrice,
  status,
}) {
  const defaults = {
    id: null,
    orderId: null,
    productId: null,
    rating: null,
    review: "",
    userId: null,
  };
  const [review, setReview] = useState(
    productReviews === undefined ? defaults : productReviews
  );
  const productName = product?.name
    .replace(/\s/g, "-")
    .replace(/[^\w\s-]/g, "");
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Link
            to={`/product/Stay-Young/${productName}/${stockId}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ color: "black" }}
          >
            {productName}
          </Link>
        </Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
        <Table.Cell>{totalPrice}</Table.Cell>
        <Table.Cell>
          {status === 1
            ? "Waiting For Seller Accept"
            : status === 2
            ? "Product Accepted"
            : status === 3
            ? "Product Packing"
            : status === 4
            ? "Product Shipping"
            : "Product Delivered"}
            
        </Table.Cell>
        <Table.Cell style={{ padding: "20px" }}>
          <ReviewDialog orderId={orderId} productId={stockId} Review={review}/>
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default OrderDetailRow;
