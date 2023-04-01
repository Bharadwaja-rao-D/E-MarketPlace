import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/sellerProductView.css";
import useAxiosInstance, { useAxios } from "../utils/useAxios";
import ProductInfo from "../components/productComponents/ProductInfo";
import ImageStack from "../components/productComponents/ImageStack";
import RequestList from "../components/userComponents/RequestList";
import Loading from "../components/commonComponents/Loading";
// A detailed product display page
function MyProductPage() {
  // Getting parameters from the url
  const { id } = useParams();
  const api = useAxiosInstance();
  const url = "products/seller/" + id + "/";
  const [data, setData] = useState(null);
  const navigate = useNavigate();

    const {apidata } = useAxios(url)
    const {apidata: interested_peeps} = useAxios("products/seller/interested/" + id + "/")

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
    const response = await api.delete("products/seller/" + id + "/");
    console.log(response);
    navigate("/myproducts");
  };
  if (apidata === null) {
    return <div></div>;
  }

  return (
    <div className="myproductpage">
      <div className="product">
        <div className="seller-product-imgs">
          <ImageStack images={apidata.images} />
        </div>
        <ProductInfo {...apidata} />
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
          <div>
            {interested_peeps && <RequestList interested_peeps={interested_peeps} />}
          </div>
    </div>
  );
}

export default MyProductPage;
