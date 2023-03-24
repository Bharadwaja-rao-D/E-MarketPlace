import "../styles/addProduct.css";
import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
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
    console.log(formData.values);
    // images.forEach((image) => {
    //   formData.append("images", image);
    // });
    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload-images/",
        formData
      );
      setImageUrls(response.data.image_urls);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail-form">
      {/* need clarity on how to send the data */}
      <form onSubmit={handleSubmit}>
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
          onChange={handleImageChange}
        />
        {/* <div className="newproduct-images">
          {images.length != 0 ? (
            images.map((image, index) => (
              <div className="newproduct-image" key={index}>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Image"
                />
                <button onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))
          ) : (
            <div>None</div>
          )}
        </div> */}
        {images.length != 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt="Uploaded Image"
            />
          ))
        ) : (
          <div>None</div>
        )}

        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";

// function AddProduct() {
//   const [images, setImages] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     images.forEach((image) => {
//       formData.append("images", image);
//     });
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/upload-images/",
//         formData
//       );
//       setImageUrls(response.data.image_urls);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" multiple onChange={handleImageChange} />
//         {images.length != 0 ? (
//           images.map((image, index) => (
//             <img
//               key={index}
//               src={URL.createObjectURL(image)}
//               alt="Uploaded Image"
//             />
//           ))
//         ) : (
//           <div>None</div>
//         )}
//         <button type="submit">Upload Images</button>
//       </form>
//       {imageUrls.map((imageUrl, index) => (
//         <img key={index} src={imageUrl} alt="Uploaded Image" />
//       ))}
//     </div>
//   );
// }

export default AddProduct;
