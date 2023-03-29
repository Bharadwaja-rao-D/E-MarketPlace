import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/sellerProductView.css";
import useAxiosInstance from "../utils/useAxios";
import ProductInfo from "../components/productComponents/ProductInfo";
import ImageStack from "../components/productComponents/ImageStack";
import RequestList from "../components/userComponents/RequestList";
// A detailed product display page
function MyProductPage() {
  // Getting parameters from the url
  const { id } = useParams();
  const api = useAxiosInstance();
  const url = "products/seller/" + id + "/";
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        setData(response.data);
        console.log(data);
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
    const response = await api.delete("products/" + id + "/");
    console.log(response);
    navigate("/myproducts");
  };
  if (data === null) {
    return <div></div>;
  }

  console.log(data.interested_peeps);
  return (
    <div className="myproductpage">
      <div className="product">
        <div className="seller-product-imgs">
          <ImageStack images={data.product.images} />
        </div>
        <ProductInfo {...data.product} />
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
        <RequestList interested_peeps={data.interested_peeps} />
      </div>
    </div>
  );
}

export default MyProductPage;
