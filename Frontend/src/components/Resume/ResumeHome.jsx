import React from "react";
import BtnButton from "../reuseCMP/BtnButton";
import resumeMain from "../../assets/resumeMain.png";

import resumeTemplate1 from "../../assets/resumeTemplate1.webp";
import resumeTemplate2 from "../../assets/resumeTemplate2.jpg";
import resumeTemplate3 from "../../assets/resumeTemplate3.avif";
import resumeTemplate4 from "../../assets/resumeTemplate4.avif";

import { Link } from "react-router-dom";

function ResumeHome() {
  const resumeTemplate = [
    {
      name: "template1",
      template: resumeTemplate1,
    },
    {
      name: "template2",
      template: resumeTemplate2,
    },
    {
      name: "template3",
      template: resumeTemplate3,
    },
    {
      name: "template4",
      template: resumeTemplate4,
    },
  ];

  return (
    <div
      className="py-18"
      style={{
        backgroundImage: `linear-gradient(to bottom, #05595b, #165e60, #226466, #2c696b, #356f71, #497c82, #5d8992, #7196a1, #97aebb, #bdc7d2, #dfe1e8, #fefefe)`,
      }}
    >
      <div className="md:px-28 px-4 w-full flex-col flex md:flex-row gap-2">
        {/* left section */}
        <div className="w-full md:w-7/12 flex flex-col   mt-10 text-white">
          <div className="flex flex-col gap-6">
            <div className="font-bold text-2xl md:text-5xl">
              <h2>
                Expose Your <span className="text-yellow-500"> Resume.</span>
              </h2>
              <h2>Expand Your Opportunities</h2>
            </div>
            <h4 className="font-bold text-lg md:text-2xl md:w-8/12">
              Create a Professional
              <span className="text-yellow-500"> Resume </span>
              with the help of AI Intelligence
            </h4>
          </div>
          <div className="flex flex-col gap-4 mt-4 md:w-10/12 font-semibold ">
            <p>
              Crafting a compelling resume has never been easier—let AI build
              your perfect professional story in seconds!
            </p>

            <div className="flex flex-row gap-4">
              <BtnButton bgcolor={"--secondary-color"} hovercolor={"--yellow"}>
                Get Hired Faster
              </BtnButton>
              <Link to={"/resume-form"}>
                <BtnButton
                  bgcolor={"--yellow"}
                  hovercolor={"--secondary-color"}
                >
                  Get Started
                </BtnButton>
              </Link>
            </div>
          </div>
        </div>

        {/* right section */}
        <div>
          <img src={resumeMain} alt="" />
        </div>
      </div>

      {/* template section */}
      {/* <div className="md:px-12 px-6">
        <div className="font-bold text-yellow-500 text-center md:text-3xl space-y-4">
          <p>Choose template </p>
          <div className="border-b-2 w-full"></div>
        </div>

        <div className="mt-10 items-center justify-center flex flex-col md:flex-row gap-4">
          {resumeTemplate?.map((item, index) => (
            <div key={index} className="   p-4 overflow-hidden  sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto">
              <div className="relative group ">
                <img
                  src={item.template}
                  alt={item.name}
                  className=" group-hover:translate-y-1.5 w-auto h-auto hover:transform-3d cursor-pointer rounded-md transition-all duration-200 hover:translate-z-2 "
                />

                <div
                  className="absolute top-0 left-0 w-full h-full transition-all duration-200  hidden group-hover:block rounded-md"
                  style={{
                    background: `rgba(255,255,255,0.4)`,
                  }}
                >
                  <div className="absolute bottom-30 left-42 md:left-22">
                    <Link
                      to={"/resume-form"}
                      className="rounded-md py-2 px-4 bg-yellow-600 font-semibold text-white hover:bg-[var(--secondary-color)]  hover:scale-105 inline-block transition-all duration-200"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default ResumeHome;
