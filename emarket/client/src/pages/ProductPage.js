import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosInstance from "../utils/useAxios";
import "../styles/productPage.css";
import ProductInfo from "../components/productComponents/ProductInfo";
import SellerInfo from "../components/userComponents/SellerInfo";
import ImageStack from "../components/productComponents/ImageStack";
import CommentSection from "../components/userComponents/CommentSection";

function ProductPage() {
  const { id } = useParams();
  const api = useAxiosInstance();
  const navigte = useNavigate();
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

  const handleInterest = async () => {
    try {
      const response = await api.post("products/interested/" + id + "/");
      navigte(0);
    } catch (error) {
      console.error(error);
    }
  };
  const handlenotint = async () => {
    try {
      const response = await api.delete("products/interested/" + id + "/");
      navigte(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="productpage">
      {data && (
        <div className="productdata">
          <div className="product-imgs">
            <ImageStack images={data.product.images} />
          </div>
          <div className="buyer-product-info">
            <ProductInfo {...data.product} />
          </div>
          <div className="buyer-seller-info">
            <SellerInfo {...data.seller} />
          </div>
        </div>
      )}

      {data && !data.interested ? (
        <div className="interested-btn">
          <button
            onClick={handleInterest}
            style={{ backgroundColor: " rgb(29, 250, 29)" }}
          >
            Interested <i className="fa fa-cart-plus fa-xl"></i>
          </button>
        </div>
      ) : (
        <div className="interested-btn">
          <button onClick={handlenotint} style={{ backgroundColor: "red" }}>
            Not Interested <i className="fa fa-times fa-xl"></i>
          </button>
        </div>
      )}

      <CommentSection id={id} />
    </div>
  );
}

export default ProductPage;
