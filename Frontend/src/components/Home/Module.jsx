import React, { useState } from "react";
import {Link} from 'react-router-dom'

function Module({ image,href=null, text=null,data=null }) {
  const [hover, setHover] = useState("none");
  const hoverHandler = () => {
    setHover("block");
  };
  const leaveHandler = () => {
    setHover("none");
  };

  return (
    <Link  to={href}
      className="md:w-[250px]  shadow-md hover:shadow-teal-700 rounded-lg font-bold text-lg bg-gray-200 flex flex-col gap-2 relative cursor-pointer transition-all duration-400 hover:scale-95 p-2"
      onMouseOver={hoverHandler}
      onMouseLeave={leaveHandler}
    >
      <div className="">
        <img src={image} alt="" />
		<p className="px-2 py-1 text-center">{data}</p>
      </div>
      <div
        className="py-1 px-2 absolute top-0 left-0 hidden transition-all duration-400 h-full w-full rounded-lg"
        style={{
          display: `${hover}`,
          background: `rgba(255,255,255,0.8)`,
        }}
      >
        <div className="flex flex-col items-center text-justify justify-center h-full">
          <p className="px-2">{text}</p>
          <i className="ri-arrow-right-line text-4xl text-green-600"></i>
        </div>
      </div>
    </Link>
  );
}

export default Module;
