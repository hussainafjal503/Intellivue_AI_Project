import React from "react";
import line from "../../assets/line.png";
import arrow from "../../assets/arrow.png";
import { Link } from "react-router-dom";

function ContactBtn() {
  return (
    <Link to="/contact-us"
    className=" md:px-4 mt-10  ">
      <div className="bg-[var(--btn-color1)] md:w-[850px] w-[350px] mx-auto py-2 pl-6 rounded-lg transition-all duration-300 h-[250px] hover:scale-90 cursor-pointer">
        <div className="relative h-full w-full">
          <p className="pl-4 font-bold text-teal-900 ">Intellivue</p>
          <p className="font-bold md:text-4xl text-xl">
            Contact-Us <i className="ri-arrow-right-line ml-3"></i>
          </p>
          <img
            src={line}
            alt=""
            className="w-20 absolute top-0 right-0 opacity-65 rotate-90 "
          />
          <img
            src={line}
            alt=""
            className="w-20 absolute top-30 right-0 opacity-65 rotate-180 "
          />
          <img
            src={line}
            alt=""
            className="w-20 absolute bottom-0 left-0 opacity-65 rotate-180 pl-0"
          />
          <img
            src={line}
            alt=""
            className="w-20 absolute top-30 md:inline-block hidden left-50 opacity-45 rotate-60 pl-0"
          />
          <img
            src={line}
            alt=""
            className="w-20 absolute top-20 md:inline-block hidden right-50 opacity-50 rotate-145 pl-0"
          />
          <img
            src={line}
            alt=""
            className="w-20 absolute top-0 md:inline-block hidden right-80 opacity-45 rotate-120 pl-0"
          />
          <img
            src={line}
            alt=""
            className="w-20 absolute top-40 md:inline-block hidden right-80 opacity-45 rotate-90 pl-0"
          />
          <img src={arrow} alt="" className="w-12" />
        </div>
      </div>
    </Link>
  );
}

export default ContactBtn;
