import React from "react";
import "../styles/addProduct.css";

function AddProduct() {
  return (
    <div className="detail-form">
      {/* need clarity on how to send the data */}
      <form >
        <label htmlFor="product-name">Product Name:</label>
        <input type="text" id="product-name" name="product-name" required />

        <label htmlFor="date-of-purchase">Date of Purchase:</label>
        <input
          type="date"
          id="date-of-purchase"
          name="date-of-purchase"
          required
        />

        <label htmlFor="cost">Cost:</label>
        <input type="number" id="cost" name="cost" required />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
        ></textarea>

        <label htmlFor="product-images">Product Images:</label>
        <input
          type="file"
          id="product-images"
          name="product-images"
          accept="image/*"
          multiple
        />

        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
}

export default AddProduct;
