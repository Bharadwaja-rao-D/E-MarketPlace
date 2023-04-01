import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImages from "../components/productComponents/ProductImages";
import useAxiosInstance from "../utils/useAxios";
import "../styles/productPage.css";
import ProductInfo from "../components/productComponents/ProductInfo";
import SellerInfo from "../components/userComponents/SellerInfo";
import ImageStack from "../components/productComponents/ImageStack";
import DisplayData from "../components/commonComponents/DisplayData";

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
      const response = await api.get(url + "/?interested=true");
      navigte(0);
    } catch (error) {
      console.error(error);
    }
  };
  const handlenotint = async () => {
    try {
      const response = await api.get(url + "/?interested=false");
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
        <button onClick={handleInterest}>Interested</button>
      ) : (
        <button onClick={handlenotint}>Not Interested</button>
      )}

      <div>A component to display comments here</div>
    </div>
  );
}

export default ProductPage;
