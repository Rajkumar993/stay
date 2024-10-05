import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../AllProducts/ProductsList";
import Cosrx from "../../Assets/Images/Cosrx.jpg";
import Haru from "../../Assets/Images/haru.jpg";
import ONETHING from "../../Assets/Images/ONETHING.jpg";
import Face from "../../Assets/Images/face.png";
import Reequil from "../../Assets/Images/Reequil.jpg";
import Klairs from "../../Assets/Images/Klairs.jpeg";
import Wishtrend from "../../Assets/Images/Wishtrend.jpg"
import "../../Assets/Styles/Brand.css";
import P1 from "../../Assets/Images/p1.jpg";
import P3 from "../../Assets/Images/p3.jpg";
import P4 from "../../Assets/Images/p4.jpg";
import P5 from "../../Assets/Images/p5.jpg";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../../env";
import userId from '../userId';

const GET_PRODUCT_QUERY = gql`
  query ProductsByCategory($filter: CategoryWiseFilter) {
  productsByCategory(filter: $filter) {
    id
    number
    name
    localName
    hsnCode
    tax
    prize
    dnp
    noStock
    minStock
    description
    specification
    shopId
    featureImage
    mastercategory
    category
    categoryId
    publish
    viewPrice
    discount
    offerends
    views
    isOnline
    productId
    productCategoryId
    barcode
    lastUpdate
    addedon
    isAddedToCart {
      inCart
    }
  }
}
`;

function Brands(props) {
  const [data, setData] = useState([]);
  const { brandName } = useParams();

  useEffect(() => {
    getBrandProducts(brandName);
  })

  let getBrandProducts = async (brandName) => {
    let user = await userId();
    if(brandName == "Re-equil"){
      brandName = brandName.split('-').join('');
    }else{
      brandName = brandName.split('-').join(' ');
    }
    try {
        const { data } = await props.client.query({
            query: GET_PRODUCT_QUERY,
            variables: {
                filter: {
                    shopId: SHOP_ID,
                    secondary: brandName,
                    userId: user ? user : null
                },
            },
        });
        if (data.productsByCategory) {
            setData(data.productsByCategory)
        }

    } catch (error) {
        console.error("Error:", error);
    }
  }

  if (brandName == "Klairs") {
    return (
      <div
        style={{
          alignItem: "center"
        }}
      >
        <center>
          <img className="brand-logo" src={Klairs} style={{ marginBottom: "2%", marginTop: "2%" }} />
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          For Klairs, it is using only the best ingredients, being cruelty-free, and providing high quality products for reasonable prices. Klairs focus on Less is more.  Each ingredient that goes into their products are handpicked for their specific influence on the skin. They add no fillers, making Klairs a reliable source for only the highest quality skincare.
          Klairs creates simple skincare without the addition of any chemicals, alcohol, parabens, and artificial colors or perfumes that may irritate skin. Klairs recognizes not only the importance of being gentle on the skin but also being gentle on the earth and prides themselves on being a green, eco-friendly,cruelty-free brand since their foundation in 2009. They pride themselves in Korea Animal Rights Advocates’ (KARA) stamp of approval as a cruelty-free brand.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }

  if (brandName == "cosrx") {
    return (
      <div
        style={{
          alignItem: "center"
        }}
      >
        <center>
          <img className="brand-logo" src={Cosrx} />
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          Cosrx believes that cosmetics should give more than just outward
          beauty. They are devoted to enabling individuals to find solutions
          according to their personal skin conditions. They strive to help our
          customers to gain self-confidence, and ultimately to find their own
          unique beauty inside. They develop products from various
          perspectives by product types / concern / ingredients. Currently we
          are supplying to more than 146 countries, also winning Global Beauty
          Awards 119 times, 2014~2021.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }
  if (brandName == "haruharu-wonder") {
    return (
      <div
        style={{
          alignItem: "center"
        }}
      >
        <center>
          <img className="brand-logo-1" src={Haru} />
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          haruharu wonder is lifestyle clean vegan skincare brand that truly fulfills 
          our day-to-day necessities. They develop top-grade all natural skincare that 
          is at the forefront of innovative fermented ingredients, which delivers visible 
          result with assured safeness and clinically proven benefits. By omitting toxic 
          additives and chemicals and utilizing the science of freshly blended formulas, 
          they are strongly advocating that there are better, sustainable solutions for your skin.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }


  if (brandName == "Wishtrend") {
    return (
      <div
        style={{
          alignItem: "center"
        }}
      >
        <center>
          <img className="brand-logo-1" src={Wishtrend} />
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          By Wishtrend is a beauty company driven by the philosophy of restoring natural beauty through effective skincare solutions. 

          Their collection of products reflects their commitment to high-quality ingredients, reasonable prices, and clear results.

          They operate under the slogan “You are the standard,” and the By Wishtrend line showcases hypoallergenic and high-functioning skincare products based on the needs and desires of their 5 million-strong community.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }

  if (brandName == "ONE-THING") {
    return (
      <div
        style={{
          alignItem: "center"
        }}
      >
        <center>
          <img className="brand-logo" src={ONETHING} />
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          ONE THING removes unnecessary costs and suggests only100% plant-based
          ingredient that your skin needs. ONE THING advocates consumers’ right
          to know and wants to help rational spending by consumers. Start living
          a healthy lifestyle with ONE THING’s 100% plant-based and animal tests
          free products. Beauty begins, when you begin with a good product.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }

  if (brandName == "Face-Shop") {
    return (
      <div
        style={{
          alignItem: "center"
        }}
      >
        <center>
          <img className="brand-logo" src={Face} /><br/><br/>
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          As Korea's pioneer beauty company committed to nature, THE FACE SHOP creates 
          products from approximately 600 natural ingredients such as flowers, grains, 
          plants, fruits, mineral water, and oriental medicine to nourish and revitalize 
          the skin. THE FACE SHOP is inspired by nature and believes that there is natural 
          beauty to everyone.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }
  if (brandName == "Re-equil") {
    return (
      <div
        style={{
          alignItem: "center",
        }}
      >
        <center>
          <img className="brand-logo" src={Reequil} />
        </center>
        <div
          style={{
            marginBottom: "5%",
            fontSize: "18px",
            lineHeight: "1.4285em",
            textAlign: "center",
            paddingLeft: "3%",
            paddingRight: "4%",
          }}
        >
          Re’equil was born in 2018 as India’s first online direct to consumer
          cosmeceutical brand. Their products are formulated by scientists and
          evaluated by dermatologists. Re’equil is built with honesty and
          empathy at its core. They offer solutions that you can trust and
          ritualise. All their products are dermatologically tested by leading
          labs for safety against any skin allergies, reaction or inflammation
          and for efficacy. The Clinical Tests are conducted under the
          supervision of dermatologists.
        </div>
        <ProductList products={data} client={props.client} />
      </div>
    );
  }
}

export default Brands;
