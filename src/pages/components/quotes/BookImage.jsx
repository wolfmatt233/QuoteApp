import { useEffect, useState } from "react";
import EditQuote from "../../EditQuote";

export default function BookImage({ quote, setPage, setDeleteModal }) {
  const image = quote.image;
  const [imageSrc, setImageSrc] = useState("./no-cover.gif");
  const [toggleHidden, setToggleHidden] = useState("");

  //store images to lighten API calls
  useEffect(() => {
    const cachedImage = localStorage.getItem(image);
    if (cachedImage) {
      setImageSrc(cachedImage);
    } else {
      if (image) {
        setImageSrc(image);
      }
    }
  }, [image]);

  const handleImageLoad = () => {
    if (image && image !== "") {
      setImageSrc(image);
      localStorage.setItem(image, image);
    } else {
      setImageSrc("./no-cover.gif");
    }
  };

  const handleImageError = () => {
    setImageSrc("./no-cover.gif");
  };

  return (
    <>
      {toggleHidden === "hidden" && (
        <div className="mr-3">
          <i
            className="fa-solid fa-expand cursor-pointer hover:text-blue-400"
            onClick={() => setToggleHidden("")}
          ></i>
        </div>
      )}

      <div className={`mr-3 ${toggleHidden}`}>
        <div className="relative w-28 h-[170px] border">
          <div
            className="bg-black w-5 h-5 absolute right-0 flex items-center justify-center cursor-pointer group"
            onClick={() => setToggleHidden("hidden")}
          >
            <i className="fa-solid fa-compress text-white group-hover:text-blue-400"></i>
          </div>

          <img
            src={imageSrc}
            alt="image-fail"
            loading="lazy"
            className="w-28 h-44 text-center"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        <div className="flex justify-around mt-3">
          <button
            className="mr-2 rounded-full bg-green-600 flex items-center justify-center h-8 w-8 group"
            onClick={() =>
              setPage({
                component: <EditQuote quote={quote} />,
                title: "Edit Quote",
              })
            }
          >
            <i className="fa-solid fa-pen-to-square text-lg text-gray-100 group-hover:text-green-300"></i>
          </button>
          <button
            className="mr-2 rounded-full bg-red-600 flex items-center justify-center h-8 w-8 group"
            onClick={() => setDeleteModal(quote.id)}
          >
            <i className="fa-solid fa-trash text-lg text-gray-100 group-hover:text-red-300"></i>
          </button>
        </div>
      </div>
    </>
  );
}
