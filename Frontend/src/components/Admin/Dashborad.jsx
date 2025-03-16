import React, { useEffect, useState } from "react";
import chart from "../../assets/chart.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchWhethear } from "../../Redux/slices/AdminSlices";
import adminBG from "../../assets/adminBG.png";
import { Link } from "react-router-dom";
import AdminNav from "./AdminNav";

function Dashborad() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [celFaren, setCelFaren] = useState("cel");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(fetchWhethear(data));
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);

  const { whetherData, allData } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);
  // console.log(allData)

  return (
    <div className="w-full flex flex-col gap-4 h-auto ">
      <AdminNav />

      <div className="bg-gray-200 shadow-md py-2 px-4 md:px-8 rounded-md  md:mx-6 flex flex-row justify-between">
        <div className="flex flex-col gap-1 font-bold w-full">
          <p className="text-lg md:text-3xl capitalize">
            Hi {user.firstName} {user.lastName}
          </p>
          <p className="text-sm font-semibold">
            Welcome! Manage Your All tasks & daily work here.
          </p>
          <p className="text-sm font-semibold text-green-600 md:block hidden">
            "Welcome to the Future of AI – Where Innovation Meets Intelligence!"
            🚀
          </p>
        </div>

        <div
          className="md:pr-30"
          style={{
            filter: `drop-shadow(-20px 10px 30px green)`,
          }}
        >
          <img
            src={adminBG}
            alt=""
            className="w-30 rounded-full"
            style={{
              filter: `drop-shadow(10px 10px 10px  green)`,
            }}
          />
        </div>
      </div>

      {/* first row */}
      <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-6 w-full px-4 md:px-6 h-auto md:h-[220px] ">
        <img
          src={chart}
          alt=""
          className="w-[450px] shadow-md rounded-md shadow-teal-500"
        />
        <div className="w-full overflow-hidden hidden md:flex justify-center ">
          <i className="ri-settings-2-fill text-[200px] animate-spin text-teal-700"></i>
        </div>

        {/* whether card */}
        <div
          className=" pb-3 m-0 md:px-4 rounded-md shadow-md shadow-gray-600 w-full"
          style={{
            background: `radial-gradient(circle at 50% 100%, #f7ff0a, #ffd000, #ffa026, #ff7144, #f9455b, #d71c6d, #ab0478, #77107b)`,
          }}
        >
          {whetherData && (
            <div className="p-0">
              <div className="flex flex-row justify-between items-center text-white font-semibold md:px-6 px-2 gap-2">
                {whetherData.current.is_day == 1 ? <p>Day</p> : <p>Night</p>}

                <div className="flex flex-row gap-1 items-center">
                  <p>{whetherData.current.condition.text}</p>
                  <img src={whetherData.current.condition.icon} alt="" />
                </div>
              </div>

              <div className="text-center text-white">
                {celFaren === "cel" ? (
                  <p className="font-bold text-3xl">
                    {whetherData.current.temp_c}
                    <sup>c</sup>
                  </p>
                ) : (
                  <p className="font-bold text-3xl">
                    {whetherData.current.temp_f}
                    <sup>c</sup>
                  </p>
                )}

                <div className="flex flex-row gap-1 text-white justify-center">
                  <button
                    className="font-bold cursor-pointer "
                    onClick={() => setCelFaren("cel")}
                  >
                    Celsius
                  </button>
                  <p>/</p>
                  <button
                    className="font-bold cursor-pointer  "
                    onClick={() => setCelFaren("faren")}
                  >
                    Fahrenheit
                  </button>
                </div>
              </div>

              <div className="text-center font-bold text-white text-sm md:text-md">
                <p>
                  Wind Speed: <span>{whetherData.current.wind_kph} km/h</span>
                </p>
              </div>

              <div className="font-bold text-white text-center flex flex-row gap-4 justify-center mt-4">
                <p>
                  Country : <span>{whetherData.location.country}</span>{" "}
                </p>

                <p>
                  State : <span>{whetherData.location.name}</span>{" "}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* last row */}

      <div className="flex flex-row w-full justify-center md:justify-between md:px-6 pt-8 gap-2 md:gap-4 flex-wrap  pb-12 md:pb-0">
        <div
          className="shadow-md hover:shadow-teal-700 transition-all duration-200 hover:translate-y-1.5 flex flex-col items-center justify-center gap-2 font-bold p-4 rounded-md w-[130px] md:w-[200px]  h-[150px] cursor-pointer text-white"
          style={{
            backgroundImage: `linear-gradient(to right top, #181b1e, #292533, #492b3b, #643430, #694a1f)`,
          }}
        >
          <p className="text-lg md:text-2xl text-center break-words">
            Total Message
          </p>
          <p className="text-2xl md:text-6xl">
            {allData?.data?.messageCount ? allData.data?.messageCount : 0}
          </p>
        </div>

        <div
          className="shadow-md hover:shadow-yellow-400 transition-all duration-200 hover:translate-y-1.5 flex flex-col items-center justify-center gap-2 font-bold p-4 rounded-md w-[150px] md:w-[200px]  h-[150px] cursor-pointer text-white"
          style={{
            backgroundImage: `linear-gradient(to right top, #051937, #00486f, #007c85, #00ad6e, #a6d53d)`,
          }}
        >
          <p className="text-lg md:text-2xl text-center break-words">
            Total User
          </p>
          <p className="text-2xl md:text-6xl">
            {allData?.data?.totalUser ? allData.data?.totalUser : 0}
          </p>
        </div>

        <div
          className="shadow-md hover:shadow-teal-700 transition-all duration-200 hover:translate-y-1.5 flex flex-col items-center justify-center gap-2 font-bold p-4 rounded-md w-[150px] md:w-[200px]  h-[150px] cursor-pointer text-white"
          style={{
            backgroundImage: `linear-gradient(to right top, #181b1e, #292533, #492b3b, #643430, #694a1f)`,
          }}
        >
          <p className="text-lg md:text-2xl text-center break-words">
            Coding Question
          </p>
          <p className="text-2xl md:text-6xl">
            {allData?.data?.codingCount ? allData.data?.codingCount : 0}
          </p>
        </div>

        <div
          className="shadow-md hover:shadow-yellow-600 transition-all duration-200 hover:translate-y-1.5 flex flex-col items-center justify-center gap-2 font-bold p-4 rounded-md w-[150px] md:w-[200px]  h-[150px] cursor-pointer text-white"
          style={{
            backgroundImage: `linear-gradient(to right top, #26d0e2, #00c2be, #00b292, #00a160, #288e2a)`,
          }}
        >
          <p className="text-lg md:text-2xl text-center break-words">
            Resume Download
          </p>
          <p className="text-2xl md:text-6xl">
            {allData?.data?.resumeCount ? allData.data?.resumeCount : 0}
          </p>
        </div>

        <div
          className="shadow-md hover:shadow-teal-600 transition-all duration-200 hover:translate-y-1.5 flex flex-col items-center justify-center gap-2 font-bold p-4 rounded-md w-[150px] md:w-[200px]  h-[150px] cursor-pointer text-white"
          style={{
            backgroundImage: `linear-gradient(to right top, #181b1e, #292533, #492b3b, #643430, #694a1f)`,
          }}
        >
          <p className="text-lg md:text-2xl text-center break-words ">
            Interview Ques.
          </p>
          <p className=" text-2xl md:text-6xl">
            {allData?.data?.interviewCount ? allData.data?.interviewCount : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashborad;
