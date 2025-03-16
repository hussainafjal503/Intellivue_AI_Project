import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getRoadMapHandler,
  getResponseByAi,
  clearAllRoadMapError,
  getAllResponses,
  singleDetails,
  deleteRoadmap,
} from "../../Redux/slices/roadmapSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BtnButton from "../reuseCMP/BtnButton";

function RoadMapData() {
  const dispatch = useDispatch();
  const params = useParams();
  const tech = params.id.toLocaleLowerCase();
  const toastShown = useRef(false);
  const [slidder, setSlidder] = useState(false);

  const sessionStored = sessionStorage.getItem("isCalled");

  const {
    loading,
    chart,
    error,
    message,
    Airesponse,
    allResponse,
    singleRoadMapDetails,
  } = useSelector((state) => state.roadmap);

  useEffect(() => {
    // if (!sessionStored || allResponse === null) {
     
    //   sessionStorage.setItem("isCalled", "true");
    // }
    dispatch(getRoadMapHandler(tech));
  }, []);

  useEffect(() => {
    dispatch(getAllResponses());
  }, [slidder]);

  useEffect(() => {
    if (!toastShown.current) {
      if (error) {
        toast.error(error);
        dispatch(clearAllRoadMapError());
      }
      if (message) {
        toast.success(message);
      }

      toastShown.current = true;
    }

    return () => {
      toast.dismiss(); // Clears any existing toasts on unmount
    };
  }, [error, message, loading]);

  const aiResponseButtonHandler = () => {
    dispatch(getResponseByAi());
  };

  // slidder handler
  const slidderHandler = () => {
    setSlidder(!slidder);
  };

  const handleDelete = (id) => {
    dispatch(deleteRoadmap(id));
  };


  // ************************************* xml code *****************************/
  return (
    <div className="pt-18  min-h-screen">
      {/* data section */}
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center text-6xl">
          <div className="main-loader"></div>
        </div>
      ) : (
        <div className="md:px-28 px-6">
          {chart ? (
            <div
              className="md:px-28 px-4"
              dangerouslySetInnerHTML={{ __html: chart }}
            ></div>
          ) : (
            <div className=" flex justify-center items-center">
              <p>RoadMap chart Comming Soon </p>
              <p>Get your Ai based roadMap</p>
            </div>
          )}
        </div>
      )}

      {/* ai section */}
      <div className="mt-10 bg-gray-200 py-8">
        <div className="font-bold text-xl md:text-3xl text-center">
          <p>Get Your Ai Resources</p>
        </div>

        {/* response section */}
        <div className="mt-10 text-center relative overflow-hidden">
          <div className="w-full">
            <div className="flex gap-4 w-full justify-center">
              <BtnButton
                bgcolor={"--secondary-color"}
                hovercolor={"--yellow"}
                textcolor={"white"}
                loading={false}
                spinner={"spinner"}
                handler={aiResponseButtonHandler}
              >
                Get Response
              </BtnButton>

              <Link to={""}>
                <BtnButton
                  bgcolor={"--yellow"}
                  hovercolor={"--secondary-color"}
                  textcolor={"white"}
                  loading={false}
                  spinner={null}
                  handler={slidderHandler}
                >
                  Get All Response
                </BtnButton>
              </Link>
            </div>

            <div className="border border-gray-300 mt-6 h-auto min-h-[250px]  md:min-h-[450px] p-4 md:p-8 rounded-md mx-4 md:mx-12">
              {Airesponse ? (
                <div className="break-words w-fit ">
                  <pre className="text-left whitespace-pre-wrap break-words text-xs md:text-lg">
                    {Airesponse}
                  </pre>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center ">
                  {singleRoadMapDetails ? (
                    <div className="break-words w-fit ">
                      <pre className="text-left whitespace-pre-wrap break-words text-xs md:text-lg">
                        {singleRoadMapDetails.resources
                          ? singleRoadMapDetails?.resources
                          : "No Resources Generated Yet"}
                      </pre>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl">No Response generated Yet</p>

                      {!Airesponse && loading && (
                        <div className="flex justify-center items-center h-full mt-10">
                          <div className="main-loader"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* side bar */}
          <div
            className="absolute top-16 right-0 w-fit md:w-[350px] bg-white overflow-y-auto min-h-[650px] py-6 px-4 font-semibold transition-all duration-200 shadow-md rounded-tl-md rounded-bl-d-md"
            style={{
              right: `${slidder ? 0 : -360}px`,
            }}
          >
            <div className="h-[650px] overflow-y-auto  flex flex-col gap-2 pb-96">
              {allResponse?.map((item, index) => (
                <button
                  key={index}
                  className="hover:bg-gray-300 py-1 rounded-md cursor-pointer flex flex-row w-full justify-around"
                  onClick={() => {
                    // console.log(item);

                    dispatch(singleDetails(item._id));
                  }}
                >
                  <p>{item.goals}</p>
                  <span
                    role="button"
                    tabIndex="0"
                    className="hover:text-red-500 cursor-pointer ml-4"
                    aria-label="Delete"
                    onClick={() => handleDelete(item._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleDelete(item._id);
                    }}
                  >
                    <i className="ri-delete-bin-6-line ml-4"></i>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadMapData;
