import { useState } from "react";
import "../../styles/imageStack.css";
import settings from "../../settings.json";

function ImageDisplay({ index, image_details }) {
  const base_url = settings.base_url;
  const image = base_url + image_details.image;
  const alt = `image ${index}`;
  return (
    <div className="image-single">
      <img src={image} alt={alt} />
    </div>
  );
}

//images => List of urls of images
export default function ImageStack({ images }) {
  const imagesCount = images.length;
  const [counter, setCounter] = useState(0);


  const before = () => {
    setCounter((imagesCount + counter - 1) % imagesCount);
  };

  const after = () => {
    setCounter((counter + 1) % imagesCount);
  };

  return (
    <div className="image-stack">
      <i className="fa fa-angle-double-left fa-2x" onClick={() => before()}></i>
      <ImageDisplay index={counter} image_details={images[counter]} />
      <i className="fa fa-angle-double-right fa-2x" onClick={() => after()}></i>
    </div>
  );
}
