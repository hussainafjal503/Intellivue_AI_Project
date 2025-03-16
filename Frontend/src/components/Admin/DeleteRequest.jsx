import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { getDeleteDataHandler } from "../../Redux/slices/AdminSlices";
import { toast } from "react-toastify";
import BtnButton from "../reuseCMP/BtnButton";
import {approveDeleteRequest,clearAllAdminError} from '../../Redux/slices/AdminSlices';

function DeleteRequest() {
  const dispatch = useDispatch();
  const { allDeleteRequest, loading, reduxError } = useSelector(
    (state) => state.admin
  );
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    dispatch(getDeleteDataHandler());
    if (reduxError) {
      toast.error(reduxError);
	  dispatch(clearAllAdminError());
    }
  }, [dispatch,allDeleteRequest]);

  const getUserDetailFunction = (id) => {
    const data = allDeleteRequest.filter((user) => user._id === id);
    setUserDetails(data[0]);
  };

  const approveRequestHandler=()=>{
	const id=userDetails._id;
	if(!id){
		return;
	}

		dispatch(approveDeleteRequest(id))
  }

  return (
    <div className="w-full ">
      <AdminNav />

      <div className="flex flex-col md:flex-row gap-2 md:pr-6  md:h-full overflow-y-auto">
        {/* left section */}
        <div className="w-full md:w-3/12 shadow-teal-700 px-2 py-2 flex flex-col gap-4 h-auto shadow-md overflow-y-auto md:min-h-[600px]">
          {allDeleteRequest &&
            allDeleteRequest.map((item, index) => (
              <button
                key={index}
                className="hover:bg-gray-200 transtion-all duration-200 px-2 font-semibold py-2 rounded-md cursor-pointer"
                onClick={() => getUserDetailFunction(item._id)}
              >
                <span>{item.email}</span>
              </button>
            ))}
        </div>

        {/* right section */}
        <div className="w-full md:w-9/12  p-4 min-h-full overflow-y-auto  ">
          {userDetails ? (
            <div className="h-full w-full flex  flex-col gap-3">
              <div className="w-full flex justify-center">
                <img
                  src={userDetails.avtar}
                  alt=""
                  className="w-20 h-20 rounded-full "
                />
              </div>

              <div className="flex flex-row w-full gap-2 ">
                <div className="flex flex-col gap-3 w-fit">
                  <p className="font-semibold">Name : </p>
                  <p className="font-semibold">Email : </p>
                  <p className="font-semibold">Role : </p>
                  <p className="font-semibold">DOB : </p>
                  <p className="font-semibold">Gender : </p>
                  <p className="font-semibold">Interview Count : </p>
                  <p className="font-semibold">Roadmaps Count : </p>
                  <p className="font-semibold">Coding Question Count : </p>
                  <p className="font-semibold">Account At : </p>
                  <p className="font-semibold">Updated At : </p>
                  <p className="font-semibold">About : </p>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {userDetails?.firstName} {userDetails?.lastName}
                  </p>
                  <p className="font-semibold text-green-600 ">
                    {" "}
                    {userDetails?.email}
                  </p>
                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {userDetails?.role}
                  </p>
                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {new Date(userDetails?.dob).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {userDetails?.gender}
                  </p>

                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {userDetails?.interview.length}
                  </p>

                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {userDetails?.roadMaps.length}
                  </p>

                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {userDetails?.codingQuestions.length}
                  </p>
                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {new Date(userDetails?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-green-600 capitalize">
                    {" "}
                    {new Date(userDetails?.updatedAt).toLocaleDateString()}
                  </p>

                  <p className="font-semibold text-green-600 capitalize break-words">
                    {" "}
                    {userDetails?.about}
                  </p>
                </div>
              </div>

              <div className="">
                <BtnButton
                  bgcolor={"--yellow"}
                  hovercolor={"--secondary-color"}
                  textcolor={"white"}
                  loading={loading}
                  spinner={"spinner2"}
                  handler={approveRequestHandler}
                >
                  Approve
                </BtnButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <span>
                <i className="ri-user-search-line text-6xl text-gray-600"></i>
              </span>
              <p className="font-bold text-2xl text-gray-600">
                {" "}
                There is no user Details{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteRequest;
