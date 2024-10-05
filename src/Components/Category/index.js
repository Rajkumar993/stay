import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import Loading from "../../Loading";
import ProductList from "../../AllProducts/ProductsList";
import userId from '../userId';
import { SHOP_ID } from "../../env";
const GetShopQuery = gql`
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

function Category(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryTitle] = useState("Categories");
  const { category } = useParams();
  useEffect(() => {
    const getProducts = async () => {
      let  userIds = await userId();
      let categoryName = category.replace(/-/g, " ");
      setLoading(true);
      setCategoryTitle(categoryName);
      try {
        const { data } = await props.client.query({
          query: GetShopQuery,
          variables: {
            filter: {
              master: categoryName,
              userId: userIds,
              shopId: SHOP_ID
            },
          },
        });
        setData(data.productsByCategory);
        setLoading(false);
      } catch (error) {
        console.log("err",error)
        setLoading(false);
      }
    };
    getProducts();
  }, [window.location.href]);

  window.scrollTo(0, 0)


  return (
    <div className="blogs-container">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <center>
          <h2>{categoryName}</h2>
          {data ?  <ProductList products={data} client={props.client} /> : null }
         
        </center>
      )}
    </div>
  );
}

export default Category;
