import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../components/productComponents/ProductImages";
import useAxiosInstance from "../utils/useAxios";
import "../styles/productPage.css";
import ProductInfo from "../components/productComponents/ProductInfo";
import SellerInfo from "../components/userComponents/SellerInfo";
import ImageStack from "../components/productComponents/ImageStack";

function ProductPage() {
  const { id } = useParams();
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
            <ProductImages />
            <ImageStack images={data.product.images}/>
          </div>
          <ProductInfo {...data.product} />
          <SellerInfo {...data.seller} />
        </div>
      )}
      <div>A component to display comments here</div>
    </div>
  );
}

export default ProductPage;
