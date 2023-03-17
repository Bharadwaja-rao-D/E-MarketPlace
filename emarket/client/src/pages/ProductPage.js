import React from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../components/productComponents/ProductImages";
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
  return (
    <div className="productpage">
      <div className="productdata">
        <div className="product-imgs">
          {/* Product images slides show will go here */}
          <ProductImages />
        </div>
        <div className="productinfo">
          <h2>Product name</h2>
          <p>Date of purchase: Date</p>
          <p>Cost: &#8377; 100</p>
        </div>
        <div className="sellerinfo">
          <h2>Seller Name: Name</h2>
          <h3>Email ID: Sller Email ID</h3>
          <p>{bl ? "ok" : "not ok"}</p>
        </div>
        <div className="description">
          <h2>Description:</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            sint quo odio aspernatur a ullam accusamus cupiditate natus corrupti
            totam, perferendis quis in excepturi vitae. Soluta error non aliquid
            veniam!
          </p>
        </div>
      </div>
      <div>A component to display comments here</div>
    </div>
  );
}

export default ProductPage;
