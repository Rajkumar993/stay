import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading";
import Review from "../Components/Reviews/Reviews";
import P1 from "../Assets/Images/p1.jpg";
import { Carousel } from "react-responsive-carousel";
import "../Assets/Styles/Product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Grid, GridColumn, Popup } from "semantic-ui-react";
import { MdCrueltyFree } from "react-icons/md";
import Empty from "../Assets/Images/empty.jpg";
import RelatedProduct from "./RelatedProduct";
import { Link } from "react-router-dom"
import userId from "../Components/userId";
import { SHOP_ID, DOMAIN } from "../env";
import { JSONLD, Product as Prod, Generic } from 'react-structured-data';
import DocumentMeta from 'react-document-meta';
import { SHOP_CITY, SHOP_NAME } from "../env";
import { ApolloConsumer } from '@apollo/client';
import { toast, Toaster } from "react-hot-toast";
import { TabPane, Tab } from 'semantic-ui-react'
import { height } from "@mui/system";
import Slider from "react-slick";
import { PaddingOutlined } from "@mui/icons-material";
import Rating from "./Rating"
const GetProductReviews = gql`
  query c($filters: reviewFilter) {
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
}
`;
const GetShopQuery = gql`
  query Products($filter: productfilter) {
    products(filter: $filter) {
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
      seoKeyword
      howToUse
      otherInformation
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
      productImage {
        id
        image
        productId
      }
      isAddedToCart {
        inCart
      }
    }
  }
`;

const GET_RELATED_PRODUCTS = gql`
query Products($filter: productfilter) {
  products(filter: $filter) {
    name
    localName
    prize
    id
    discount
    featureImage
    productId
    number
    shopId
    tax
    isAddedToCart {
      inCart
    }
  }
}`
const AddToCartQuery = gql`mutation Mutation($productId: Int, $shopId: Int, $userId: Int) {
    Cart(productId: $productId, shopId: $shopId, userId: $userId) {
      shopId
      productId
      userId
    }
  }`

let userIds = await userId();

function Category(props) {
  const [reviews,setReviews] = useState([]);
  let [data, setData] = useState({ description: "", isAddedToCart: { inCart: true } });
  const [loading, setLoading] = useState(false);
  const [descriptionviewmore, descriptionviewmoreset] = useState(false);
  const value = useParams()['*'].split("/");
  const productId = value[value?.length - 1];
  const navigate=useNavigate()
  const [avgRating,setAvgRating] = useState(0);
  const [noOfRating,setNoOfRating] = useState(0);
  const [activeTab,setActiveTab] = useState(0);

  const handleReview = (event) => {
    event.preventDefault();
    setActiveTab(4);
  };
  const panes = [
    {
      menuItem: 'Description', render: () => <TabPane>
        <div className="product-discription" style={{ textAlign: "justify", maxHeight: "30rem", overflowX: "auto", padding: "4%" }}>
          <p
            style={{
              fontSize: "1.1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: description }} />
            {descriptionviewmore}
            <b
              style={{ cursor: "pointer" }}
              onClick={() =>
                descriptionviewmoreset(descriptionviewmore ? false : true)
              }
            >
              {descriptionviewmore ? "View Less..." : "View More..."}
            </b>
          </p>
        </div>
      </TabPane>
    },
    {
      menuItem: 'Ingredients', render: () => <TabPane>
        <React.Fragment>
          <div className="product-discription" style={{ maxHeight: "30rem", overflowX: "auto", padding: "4%" }}>
            {/* <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>
              Product Specification
            </h1> */}
            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data.specification }}
                />
              </p>
            </div>
          </div>
        </React.Fragment>
      </TabPane>
    },

    {
      menuItem: 'How to use?', render: () => <TabPane>
        <React.Fragment>
          <div className="product-discription" style={{ maxHeight: "30rem", overflowX: "auto", padding: "4%" }}>
            {/* <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>
              How to use?
            </h1> */}
            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data.howToUse }}
                />
              </p>
            </div>
          </div>
        </React.Fragment>
      </TabPane>
    },

    {
      menuItem: 'Other Information', render: () => <TabPane  >
        <React.Fragment>
          <div className="product-discription" style={{ maxHeight: "30rem", overflowX: "auto", padding: "4%" }}>
            {/* <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>
              Other Information
            </h1> */}
            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data.otherInformation }}
                />
              </p>
            </div>
          </div>
        </React.Fragment>
      </TabPane>
    },
    {
      menuItem: 'Reviews', render: () => <TabPane>
        <React.Fragment >
        <div  style={{ maxHeight: "30rem", overflowX: "none", padding:"0px"}}>
        {
          reviews.map(review => {
            
            return(
            <Review
              key={review.id}
              name={review.UserInfo.customerName}
              rating={review.rating}
              review={review.review}
            />
          )})
        }
      </div>
        </React.Fragment>
      </TabPane>
    },

  ]

  const AddToCartQuery = gql`mutation Mutation($productId: Int, $shopId: Int, $userId: Int) {
    Cart(productId: $productId, shopId: $shopId, userId: $userId) {
      shopId
      productId
      userId
    }
  }`

  const { loading: getProductsLoading, error: getProductsError, data: getProducts, refetch: getProductsRefetch } = useQuery(GetShopQuery, {
    variables: {
      "filter": {
        "productId": Number(productId),
        "userId": userIds,
      }
    },
  });

  useEffect(() => {
    if (getProductsRefetch) {
      getProductsRefetch()
    }
    if (getProductsLoading) {
      setLoading(true)
    }
    if (getProducts) {
      setLoading(false)
      setData(getProducts?.products[0])
    }
    if (getProductsError) {
      console.log("getProductsError", getProductsError);
    }
    const productReviews = ()=>{
      props.client.query({
        query: GetProductReviews,
        variables: {
          filters: {
            productId: Number(productId)
          }
        }
      }).then((res) => {
        setReviews(res.data.productReviews)
        calcAvrgRating(res.data.productReviews)
      }).catch((err) => {
        console.log(err)
      })
    }
    function calcAvrgRating(reviews){
      let avg = 0;
      const totalReview = reviews.length;
      if(totalReview.length == 0){
        setAvgRating(0);
        return;
      }
      setNoOfRating(totalReview);
      reviews.map((review) =>{
        avg += review.rating;
      })
      avg = avg/totalReview;
      let n = avg.toPrecision(2);
      setAvgRating(n);
    }
    productReviews();
  }, [getProducts, getProductsRefetch, getProductsError],[reviews]);

  const addToCart = async () => {
    let userIds = await userId();
    if (userIds) {
      if (data?.noStock == null || data?.noStock == 0) {
        alert("Stock Not Available")
      } else {
        try {
          const response = await props.client.mutate({
            mutation: AddToCartQuery,
            variables: {
              shopId: SHOP_ID,
              productId: Number(productId),
              userId: userIds,
              quantity: 1
            },
          });
          toast.success("Product added on cart successfully!!!!");
          window.location.href = window.location.href;
        } catch (error) {
          alert(error)
          console.error("Error:", error);
        }
      }
    }
    else {
      navigate('/login')
    }
  }

  const convertIntoNumber = (value) => {
    try {
      value = Number(value);
    } catch (error) {
      value = 0;
    }
    return value;
  }

  const Round = (value) => {
    try {
      value = value.toFixed(0);
    } catch (error) {
      value = 0;
    }
    return convertIntoNumber(value);
  }

  const selectProduct = (productImages) => {
    return (
      <div className="carouusel-image">
        <Carousel
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          thumbWidth={60}
          showThumbs={true}
          swipeable={true}
          className="productCarousel"
        >
          {productImages?.map((src) => (
            <img id="image-current" src={src.url} />
          ))}
        </Carousel>
      </div>
    );
  };

  let price = data.prize - data.discount;
  price = price + (price * data.tax) / 100;

  price = Round(price);
  let description = data?.description;
  // if (description.length > 100 && !descriptionviewmore) {
  //   description = description.substring(0, 100);
  // }
  let featureImage = Empty;
  if (data.featureImage) {
    featureImage =
      "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" +
      data.featureImage;
  }
  let images = [{ url: featureImage }];
  try {
    data.productImage.map((c) => {
      if (c.image) {
        images.push({ url: "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" + c.image });
      }
    });
  } catch (error) { }

  let title = "Product " + " in " + SHOP_CITY + " - " + SHOP_NAME;
  let descriptions = "Loading... Stay-Young Shops is used to shop and purchase products from various shops.";
  let keyword = "Loading... Stay-Young Shops is used to shop and purchase products from various shops.";
  if (data.name) { //check product details loaded
    title = data.name + " in " + SHOP_CITY + ", " + SHOP_CITY + " - " + SHOP_NAME;
    descriptions = data.description;
    keyword = data.seoKeyword ? data.seoKeyword : title;
    var tempElement = document.createElement("div");
    tempElement.innerHTML = descriptions;
    descriptions = tempElement.textContent || tempElement.innerText;
  }

  const meta = {
    title: title,
    description: descriptions,
    canonical: window.location.href,
    meta: {
      charset: 'utf-8',
      name: { keywords: keyword }
    }
  };

  const getJSONLD = (z) => {
    if (!z) return;

    let item = z;
    let out = (
      <JSONLD>
        <Prod
          name={item.name}
          description={item.description}
          image={item.featureImage}
          productId={item.id}
          category={item.category}
          url={window.location.href}>
          <Generic
            type="offers"
            jsonldtype="Offer"
            schema={{ priceCurrency: "INR", price: item.prize }} />
        </Prod>
      </JSONLD>
    );
    return out;
  }
  const makeDecimalPoint = (value) => {
    try {
      value = value.toFixed(2);
    } catch (error) {
      value = 0;
    }
    return value;
  }


  return (
    <DocumentMeta {...meta}>
      {getJSONLD(data)}
      <div className="blogs-container">
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <div className="product-container">
            <Grid
            // className="product-container1"
            >
              <GridColumn computer={8} tablet={16} mobile={16}>
                {selectProduct(images)}
              </GridColumn >
              <GridColumn computer={8} tablet={16} mobile={16} className="right-container">
                <h2>{data.name}</h2> 
                <span onClick={(e)=>{
                  handleReview(e);
                }}>
                <Rating rate={avgRating}/> <span style={{fontSize: "1rem",
                    fontWeight: "400",
                    cursor:"pointer",
                    color: "rgba(0, 0, 0, 0.5)",}}>{`${noOfRating} Reviews and Ratings`}</span></span>
                <div className="price-details-container">
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        marginRight: "0.5rem",
                        fontSize: "1.55rem",
                        fontWeight: "200",
                      }}
                    >
                      Price: {data.discount <= 0 ? "₹ " + Round(price) : "₹ " + (price)}
                    </p>
                    <p className="product-dicount">{data.discount > 0 ? Round(data.prize+(data.prize*data.tax)/100) : null}</p>
                    <p className="product-offer">
                      {" "}
                      {data.discount > 0
                        ? `${((data.discount / data.prize) * 100).toFixed(0)}%`
                        : ""}
                    </p>
                  </div>
                  
                  {
                      data?.noStock == 0 ? 
                      <div style={{ color: 'red', fontSize: '16px' }}>Out Of Stock</div> :
                      null
                  }
                </div>
                
                <div
                  style={{
                    fontSize: "1.20rem",
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  incl. of taxes
                </div>
                <div
                  style={{
                    fontSize: "1.20rem",
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.5)",
                    marginTop: "0.7%",
                  }}
                >
                  {`(Also includes all applicable duties)`}
                </div>
                <div
                  style={{
                    fontSize: "1.20rem",
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.5)",
                    marginTop: "0.7%",
                  }}
                >
                  {!data.noStock ? "Out of Stock" : null}
                </div>
                {
                  data?.isAddedToCart?.inCart ?
                    <Link to={"/cart"}>
                      <button className="product-autocart">Go to Cart</button>
                    </Link>
                    :
                    <button onClick={() => addToCart()} className="product-autocart">Add to Cart</button>
                }

                <Tab onTabChange={(e, { activeIndex }) => setActiveTab(activeIndex)} activeIndex={activeTab} menu={{  secondary: true, pointing: true, style: { WebkitScrollbar: 'touch', overflowX: 'hidden', overflowY: "hidden", padding: "2%" } }} panes={panes} />
              </GridColumn>
            </Grid>
          </div>
        )}
        <RelatedProduct userId={userId} client={props.client} />
      </div>
      
      <Toaster />
    </DocumentMeta >
  );
}

export default Category;
