import React, { useState } from "react";

import { Outlet,Link,useLocation } from "react-router-dom";

function CodingHome() {
  const location=useLocation();
  return (
    <div
      className="w-full pt-22 h-auto pb-8 min-h-screen px-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, #05595b, #165e60, #226466, #2c696b, #356f71, #497c82, #5d8992, #7196a1, #97aebb, #bdc7d2, #dfe1e8, #fefefe)`,
      }}
    >
      <div className="h-auto ">
        {/* tagline section */}
        <div className="w-full text-center space-y-6">
          <h3 className="font-bold md:text-4xl text-3xl text-center text-white">
            Level Up Your
            <span className="text-yellow-500"> Coding Skills </span>
            with AI
          </h3>
          <p
            className="md:w-6/12 w-full mx-auto font-semibold text-white leading-7"
            style={{
              fontFamily: `"Source Code Pro", monospace`,
            }}
          >
            "An AI-driven platform designed to help coders of all levels enhance
            their skills through real-time feedback, intelligent suggestions,
            and hands-on coding challenges!"
          </p>
        </div>

        <div className="flex flex-row gap-2 w-full justify-center my-8 font-bold items-center text-yellow-500">
          <div className="w-full border-b border-yellow-500"></div>
          <p className="py-1 px-2 rounded-full shadow-xs shadow-yellow-500">
            CodingExercises
          </p>
          <div className="w-full border-b border-yellow-500"></div>
        </div>


              {/* buttom section for getting all questions */}
              <div className="px-10 flex justify-center mb-6 ">
                <button className={` ${location.pathname ==="/coding-practice/coding-questions" && "hidden"} hover:scale-95 transition-all duration-200`}>
                <Link  

                to={"/coding-practice/coding-questions"}
                className="font-bold text-lg shadow-sm rounded-md shadow-green-500 py-1 px-4 bg-[var(--btn-color1)] hover:bg-[var(--yellow)] hover:text-white"> Get all Question</Link>
                </button>
               
              </div>


              {/********************** outlet sections  *****************/}
        
      </div>
      <div className="h-auto">
          <Outlet />
        </div>
    </div>
  );
}

export default CodingHome;
