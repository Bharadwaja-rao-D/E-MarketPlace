import React from "react";
import { useParams } from "react-router-dom";

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
      <h3> This is product page of id={id}</h3>
      <div className="product-imgs">
        Product images slides show will go here
      </div>
      <h2>Product name</h2>
      <p>Date of purchase: Date</p>
      <p>Cost: &#8377; 100</p>
      <p className="description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident sint
        quo odio aspernatur a ullam accusamus cupiditate natus corrupti totam,
        perferendis quis in excepturi vitae. Soluta error non aliquid veniam!
      </p>
      <div className="seller-info">
        <h2>Seller Name: Name</h2>
        <h3>Email ID: Sller Email ID</h3>
        {/* If there is access to the personal contact info will be displayed*/}
        {/* else a button to display INTRESTED will be shown */}
        {/* Dont Know why the below thong is not working */}
        {/* {() => {
          if (bl)
            return (
              <React.Fragment>
                <p>You have access</p>
              </React.Fragment>
            );
          else
            return (
              <React.Fragment>
                <p>You Do NOT have access</p>
              </React.Fragment>
            );
        }} */}
      </div>
    </div>
  );
}

export default ProductPage;
