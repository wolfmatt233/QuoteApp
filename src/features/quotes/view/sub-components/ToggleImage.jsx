import { useState } from "react";
import IconButtons from "./IconButtons";
import BookImage from "./BookImage";

export default function ToggleImage(props) {
  const [toggleHidden, setToggleHidden] = useState(false);

  return (
    <>
      {toggleHidden === true ? (
        <div className="mr-3 h-[170px]">
          <i
            className="fa-solid fa-expand cursor-pointer hover:text-blue-400"
            onClick={() => setToggleHidden(false)}
          ></i>
        </div>
      ) : (
        <div className="mr-3">
          <div className="relative w-28 h-[170px] border">
            <div
              className="bg-black w-5 h-5 absolute right-0 flex items-center justify-center cursor-pointer group"
              onClick={() => setToggleHidden(true)}
            >
              <i className="fa-solid fa-compress text-white group-hover:text-blue-400"></i>
            </div>

            <BookImage image={props.quote.image} />
          </div>
          <IconButtons {...props} />
        </div>
      )}
    </>
  );
}
