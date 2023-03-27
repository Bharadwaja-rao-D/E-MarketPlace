import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../components/productComponents/ProductImages";
import useAxiosInstance from "../utils/useAxios";
import "../styles/productPage.css";

// A detailed product display page
function ProductPage() {
  // Getting parameters from the url
  const { id } = useParams();
  //   API call with id to get data
  // Holds the no of images of products
  const no_of_imgs = 3;
  const bl = 1;
  // TODO Look at how to display multiple images
  // TODO style the page

  const api = useAxiosInstance();
  const url = "products/" + id;
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="productpage">
      {data && (
        <div className="productdata">
          <div className="product-imgs">
            {/* Product images slides show will go here */}
            <ProductImages />
          </div>
          <div className="productinfo">
            <h2>{data.name}</h2>
            <p>Date of purchase: {data.date_of_purchase}</p>
            <p>Cost: &#8377; {data.cost}</p>
          </div>
          <div className="sellerinfo">
            <h2>Seller Name: Name of {data.seller_id}</h2>
            <h3>Email ID: Sller Email ID</h3>
            <p>{bl ? "ok" : "not ok"}</p>
          </div>
          <div className="description">
            <h2>Description:</h2>
            <p>{data.description}</p>
          </div>
        </div>
      )}
      <div>A component to display comments here</div>
    </div>
  );
}

export default ProductPage;
