import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";

function Brands(props) {
  const { productId } = useParams();

  return (
    <div>
      <div>{productId}</div><br/>
      <RelatedProduct userId={1} client={props.client} />
    </div>
  )

  
}

export default Brands;

