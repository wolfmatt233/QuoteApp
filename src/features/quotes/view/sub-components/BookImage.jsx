import { useEffect, useState } from "react";

export default function BookImage({ image }) {
  const [imageSrc, setImageSrc] = useState("./no-cover.gif");

  useEffect(() => {
    if (image) {
      setImageSrc(image);
    }
  }, [image]);

  const handleImageLoad = () => {
    if (image && image !== "") {
      setImageSrc(image);
    } else {
      setImageSrc("./no-cover.gif");
    }
  };

  const handleImageError = () => {
    setImageSrc("./no-cover.gif");
  };

  return (
    <img
      src={imageSrc}
      alt="image"
      loading="lazy"
      className="w-28 h-44 text-center"
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
}
