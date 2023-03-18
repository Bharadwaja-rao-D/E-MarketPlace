import "./imageStack.css";

function ImageDisplay({index, image}){
    return (
        <div className="image-single">
            <img src={image} alt="" />
        </div>
    );
}



//images => List of urls of images
export default function ImageStack({images}){
    return (
    <>
      <div className="image-stack">
        {images.map((image, index) => {
          return <ImageDisplay key={index} index={index} image = {image}></ImageDisplay>;
        })}
      </div>
    </>
    );
}
