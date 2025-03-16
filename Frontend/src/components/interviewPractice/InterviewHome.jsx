import React, { useCallback, useEffect, useState } from "react";
import interviewMain from "../../assets/interviewMain.gif";
import BtnButton from "../reuseCMP/BtnButton";
import { Link, useNavigate } from "react-router-dom";
import {
  createInterviewTechnolgy,
  clearAllInterviewError,
} from "../../Redux/slices/interviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function InterviewHome() {
  const [start, setStart] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { loading, error, message } = useSelector((state) => state.interview);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const buttonHandler = useCallback(() => {
    setStart(true);
  }, []);



  useEffect(() => {
    if (message && isAuthenticated) {
      toast.success(message);
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, loading, error]);
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("please Login");
      navigateTo("/login");
    }
  }, []);

  const submitTechHandler = useCallback(() => {
    dispatch(createInterviewTechnolgy(inputValue));
  }, [inputValue]);
  return (
    <div
      className=" h-auto pt-20 pb-2"
      style={{
        backgroundImage: `linear-gradient(to bottom, #05595b, #165e60, #226466, #2c696b, #356f71, #497c82, #5d8992, #7196a1, #97aebb, #bdc7d2, #dfe1e8, #fefefe)`,
      }}
    >
      {/* main section */}
      <div className=" px-4 md:px-10 shadow-lg shadow-teal-800 flex flex-col-reverse md:flex-row p-2 gap-2 rounded-md">
        <div className="w-full p-4">
          <p className="w-fit bg-gray-700 md:font-semibold pr-4 py-2 pl-1 rounded-full mb-4 text-white text-xs md:text-xl hidden md:block">
            <span className="bg-gray-600 rounded-full px-2 py-1">Practice</span>
            <span>
               smart, code better, and ace your next technical interview.
            </span>
          </p>
          <h3 className="font-bold text-lg md:text-5xl text-white">
            Master Coding
            <span className="text-yellow-500"> Interviews </span>
            with Confidence.
          </h3>
          <p
            className="font-medium text-white mt-6 text-justify text-xs md:text-lg"
            style={{
              fontFamily: `"Source Code Pro", monospace`,
            }}
          >
            Crack coding interviews with confidence and precision. Sharpen your
            skills and secure your dream tech job!,Ace every coding challenge,
            sharpen your skills, and secure top tech jobs with ease.
          </p>

          <div className="border-b border-yellow-500 w-full py-4"></div>

          <div className="w-full flex flex-row md:justify-around gap-2 flex-wrap mt-6 md:text-md text-white">
            <p className="  rounded-full py-1 px-4  bg-[var(--secondary-color)] shadow-md">
              HTML
            </p>
            <p className="  rounded-full py-1 px-4 bg-[var(--secondary-color)] shadow-md">
              Css
            </p>
            <p className=" rounded-full py-1 px-4 bg-[var(--secondary-color)] shadow-md">
              Java
            </p>
            <p className=" rounded-full py-1 px-4 bg-[var(--secondary-color)] shadow-md">
              JavaScript
            </p>
          </div>

          {!start ? (
            <div className="mt-6">
              <p className="text-yellow-800 mb-2">
                <i className="ri-check-line mr-2"></i>
                No excuses, just practice
              </p>

              <BtnButton
                bgcolor={"--yellow"}
                hovercolor={"--secondary-color"}
                textcolor={"white"}
                loading={false}
                spinner={"spinner1"}
                handler={buttonHandler}
              >
                Get Started Free
              </BtnButton>
            </div>
          ) : (
            <div className="mt-6">
              <div className="space-y-2 mb-2">
                <p className="text-yellow-800 text-xs md:text-base mb-2">
                  <i className="ri-check-line "></i>
                  Enter Technology Name to Start Journey
                </p>
                <input
                  type="text"
                  placeholder="Technology Name"
                  className="rounded-md py-1 px-2 outline-none border border-white"
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <Link to={"/interview-practice/question"}>
                <BtnButton
                  bgcolor={"--yellow"}
                  hovercolor={"--secondary-color"}
                  textcolor={"white"}
                  loading={loading}
                  spinner={"spinner1"}
                  handler={submitTechHandler}
                >
                  Start
                </BtnButton>
              </Link>
            </div>
          )}
        </div>
        <div className="">
          <img src={interviewMain} alt="" className="rounded-md " />
        </div>
      </div>
    </div>
  );
}

export default InterviewHome;
