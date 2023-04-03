import { useNavigate } from "react-router-dom";

import ProductList from "../components/productComponents/ProductList";
import "../styles/myproductsPage.css";
import DisplayData from "../components/commonComponents/DisplayData";

function MyProducts() {
  const url = "products/seller/";
  const navigate = useNavigate();
  const nav_to = "/myproducts/";
  const handleClick = () => {
    navigate("/addproduct");
  };
  return (
    <>
      <div className="btn-cont">
        <button onClick={() => handleClick()} className="addbutton">
          <span class="addbuttonspan">Add Product</span>
        </button>
      </div>
      <DisplayData url={url} Child={ProductList} nav_to={nav_to}/>
    </>
  );
}

export default MyProducts;
