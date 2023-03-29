import "../styles/addProduct.css";
import React, { useState, useEffect } from "react";
import useAxiosInstance from "../utils/useAxios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [images, setImages] = useState([]);
  const [data, setData] = useState(null);
  const [name, setName] = useState("name");
  const [actual_cost, setAC] = useState(100);
  const [selling_cost, setSC] = useState(100);
  const [description, setDescriprion] = useState("test desc");
  const [dop, setdop] = useState("2023-01-03");
  const navigte = useNavigate();
  const { id } = useParams();
  const url = "products/" + id + "/";
  const api = useAxiosInstance();

  // Get Data by api call
  useEffect(() => {
    console.log("called API");
    async function fetchData() {
      try {
        const response = await api.get(url);
        setData(response.data.product);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data !== null) {
      setName(data.name);
      setAC(data.actual_cost);
      setSC(data.selling_cost);
      setDescriprion(data.description);
      setdop(data.date_of_purchase);
    }
  }, [data]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };
  const removeImage = (idx) => {
    images.splice(idx, 1);
    setImages([...images]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.delete("uploaded_images");
    images.forEach((image) => {
      formData.append("uploaded_images", image);
    });
    try {
      const response = await api.put(url, formData);
      // setImageUrls(response.data.image_urls);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // display a successfully uploaded banner and then navigate in 2 to 5 secs
    navigte("/myproducts");
  };

  if (data === null) {
    return <div></div>;
  }
  return (
    <div className="detail-form">
      {/* need clarity on how to send the data */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="date_of_purchase">Date of Purchase:</label>
        <input
          type="date"
          id="date_of_purchase"
          name="date_of_purchase"
          required
          value={dop}
          onChange={(e) => setdop(e.target.value)}
        />

        <label htmlFor="selling_cost">Actual Cost:</label>
        <input
          type="number"
          id="actual_cost"
          name="actual_cost"
          required
          value={actual_cost}
          onChange={(e) => setAC(e.target.value)}
        />
        <label htmlFor="selling_cost">Selling Cost:</label>
        <input
          type="number"
          id="selling_cost"
          name="selling_cost"
          required
          value={selling_cost}
          onChange={(e) => setSC(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          value={description}
          onChange={(e) => setDescriprion(e.target.value)}
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

        <input type="submit" value="Edit Product" />
      </form>
    </div>
  );
}

export default Edit;
