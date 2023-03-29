import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImages from "../components/productComponents/ProductImages";
import "../styles/sellerProductView.css";
import useAxiosInstance from "../utils/useAxios";

// A detailed product display page
function MyProductPage() {
  // Getting parameters from the url
  const { id } = useParams();
  const api = useAxiosInstance();
  const url = "products/" + id + "/";
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleEditClick = () => {
    navigate("/myproducts/edit/" + id);
  };
  const handleSold = () => {
    console.log("Api call to mark the product as sold and navigate back");
    // cant go back after navigae navigate in such a way
    // navigate("/myproducts");
  };
  const handleDelete = async () => {
    console.log("Api call to delete the product ");
    // cant go back after navigae navigate in such a way
    const response = await api.delete(url);
    console.log(response);
    navigate("/myproducts");
  };
  //   API call with id to get data

  // TODO Look at how to display multiple images
  // TODO style the page
  return (
    <div className="myproductpage">
      <div className="product">
        <div className="seller-product-imgs">
          {/* Product images slides show will go here */}
          <ProductImages />
        </div>
        <div className="product-info">
          <h2>{data.name}</h2>
          <p>Date of purchase: {data.date_of_purchase}</p>
          <p>Actual Cost: &#8377; {data.actual_cost}</p>
          <p>Selling Cost: &#8377; {data.selling_cost}</p>
          <h2>Description:</h2>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleEditClick} className="edit-button">
          Edit Info <i className="fa fa-edit"></i>
        </button>
        <button onClick={handleSold} className="sold-button">
          Mark as sold <i className="fa fa-check"></i>
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Product <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
      {/* the comments and requests goes here */}
    </div>
  );
}

export default MyProductPage;
