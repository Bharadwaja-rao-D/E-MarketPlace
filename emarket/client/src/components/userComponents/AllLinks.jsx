import React from "react";

function AllLinks() {
  return (
    <div className="links">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/cart">Cart</a>
        </li>
        <li>
          <a href="/addproduct">Add Product</a>
        </li>
        <li>
          <a href="/myproducts">My Products</a>
        </li>
        <li>
          <a href="/product/20">Product</a>
        </li>
        <li>
          <a href="/soldproducts">Sold Products</a>
        </li>
        <li>
          <a href="/myproducts/20">MY Product 20</a>
        </li>
        <li>
          <a href="/myproducts/edit/20">MY Product 20 edit</a>
        </li>
        <li>
          <a href="/mark-as-sold/20">Mark As Sold</a>
        </li>
      </ul>
    </div>
  );
}

export default AllLinks;
