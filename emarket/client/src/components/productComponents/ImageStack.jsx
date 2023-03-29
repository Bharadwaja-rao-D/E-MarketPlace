import { useState } from "react";
import "./imageStack.css";
import settings from "../../settings.json"

function ImageDisplay({index, image_details}){
    const base_url = settings.base_url
    const image = base_url+image_details.image
    const alt = `image ${index}`
    return (
        <div className="image-single">
            <img src={image} alt={alt} />
        </div>
    );
}



//images => List of urls of images
export default function ImageStack({images}){
    const imagesCount = images.length
    const [counter, setCounter] = useState(0)

    const before = () => {
        setCounter((imagesCount + counter - 1) % imagesCount)
    }

    const after = () => {
        setCounter((counter + 1) % imagesCount)
    }

    return (
      <div className="image-stack">
        <button onClick={() => before()}>Before</button>
        <ImageDisplay index={counter} image_details={images[counter]}/>
        <button onClick={() => after()}>After</button>
      </div>
    );
}
