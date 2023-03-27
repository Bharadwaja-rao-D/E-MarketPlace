import "../styles/addProduct.css";
import React, { useState } from "react";
import axios from "axios";
import useAxiosInstance from "../utils/useAxios";
import settings from "../settings.json";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const navigte = useNavigate();
  const url = "products/";
  const api = useAxiosInstance();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };
  const removeImage = (idx) => {
    images.splice(idx, 1);
    setImages([...images]);
    // Need more clarity on this
    // How to change form data?
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.delete("uploaded_images");
    images.forEach((image) => {
      formData.append("uploaded_images", image);
    });
    try {
      const response = await api.post(url, formData);
      // setImageUrls(response.data.image_urls);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // display a successfully uploaded banner and then navigate in 2 to 5 secs
    navigte("/myproducts");
  };

  return (
    <div className="detail-form">
      {/* need clarity on how to send the data */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="date_of_purchase">Date of Purchase:</label>
        <input
          type="date"
          id="date_of_purchase"
          name="date_of_purchase"
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

        <label htmlFor="uploaded_images">Product Images:</label>
        <input
          type="file"
          id="uploaded_images"
          name="uploaded_images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className="images_list">
          {images.length != 0 ? (
            images.map((image, index) => (
              <div className="uploaded_image" key={index}>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Image"
                />
                {/* <button onClick={() => removeImage(index)}>Remove</button> */}
                <input
                  type="button"
                  value="remove"
                  onClick={() => removeImage(index)}
                ></input>
              </div>
            ))
          ) : (
            <div>None</div>
          )}
        </div>

        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
}

export default AddProduct;
