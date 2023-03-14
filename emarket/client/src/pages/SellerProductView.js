import React from "react";
import { useParams } from "react-router-dom";

// A detailed product display page
function MyProductPage() {
  // Getting parameters from the url
  const { id } = useParams();
  //   API call with id to get data
  // Holds the no of images of products
  const no_of_imgs = 3;
  const bl = 1;
  // TODO Look at how to display multiple images
  // TODO style the page
  return (
    <div className="myproductpage">
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
      <button>Edit INFO</button>
      <button>Mark as Sold</button>
      <button>Delete</button>
    </div>
  );
}

export default MyProductPage;
