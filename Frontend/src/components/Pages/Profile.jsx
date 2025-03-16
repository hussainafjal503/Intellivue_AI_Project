import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import {
  logout,
  clearAllError,
  profilePictureUpdate,
  deleteAccountHandlerRedux
} from "../../Redux/slices/authSlice";
import { toast } from "react-toastify";

import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

function Profile() {
  const location=useLocation();
  const { user, message, error, isAuthenticated,imageLoading } = useSelector(
    (state) => state.auth
  );

  // console.log(user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const avatar = createAvatar(lorelei, {
    seed: `${user?.firstName} ${user?.lastName}`,
  });

  const svg = avatar.toDataUri();
  //   console.log(svg);
  const [camera, setCamera] = useState(false);
  const fileref = useRef(null);

  const fileClickHandler = () => {
    fileref.current.click();
  };

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (!file) {
      new Swal({
        icon: "warning",
        text: "Please Choose Image",
      });
    }

    if (file) {
      dispatch(profilePictureUpdate(file));
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    // console.log(isAuthenticated);
    if (message && !isAuthenticated && !user) {
      toast.success(message);
      // console.log(user);
      navigateTo("/", { replace: true });
    }else if(message){
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllError());
    }
  }, [error, message, dispatch, isAuthenticated, user]);

  // console.log(user);

  const deleteHandler=()=>{
    dispatch(deleteAccountHandlerRedux());
  }

  return (
    <div className={`${location.pathname==="/profile" ? "mt-20" : "mt-0"} max-w-screen z-20  h-auto mb-4`}>
      <div className="flex flex-col gap-2 px-6">
        <div className="flex flex-row gap-4 items-center  py-2">
          <div className="flex flex-col gap-2  ">
            <div className="border-b-3 border-green-500 w-10 md:w-40 ml-auto"></div>
            <div className="border-b-3 border-green-500 w-20 md:w-50"></div>
          </div>
          <h2 className="md:text-3xl text-md font-bold text-green-500 ">
            MY PROFILE
          </h2>
          <div className="flex flex-col gap-2  ">
            <div className="border-b-3 border-green-500 w-10 md:w-40 "></div>
            <div className="border-b-3 border-green-500 w-20 md:w-50"></div>
          </div>
        </div>

        {/* profile section */}
        <div className="shadow-md flex flex-col text-center md:text-left md:flex-row gap-1 md:gap-4 w-full px-6 items-center bg-gray-200 rounded-lg pb-4 md:p-2">
          <div
            className="relative  rounded-full  "
            onMouseOver={() => setCamera(true)}
            onMouseLeave={() => setCamera(false)}
            style={{
              background: `rgba(0,0,0,0.1)`,
            }}
          >
            <img
              src={user?.avtar ? user?.avtar : svg}
              alt="pp"
              className="rounded-full w-[150px] h-[150px] "
            />

          

            <button
              className={`absolute top-[40%] left-[40%] text-3xl  ${
                camera ? "block" : "hidden"
              } transition-all duration-200 cursor-pointer`}
              onClick={fileClickHandler}
            >
             {

              imageLoading ? <div className="spinner"></div>:

              <i className="ri-camera-fill text-[var(--secondary-color)] "></i>
             }
              <input
                type="file"
                className="w-fit text-xs hidden"
                ref={fileref}
                onChange={fileUploadHandler}
              />
            </button>
          </div>
          <div className="capitalize ">
            <h3 className="text-green-700 font-bold text-lg md:text-xl">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="font-semibold text-gray-600">{user?.role}</p>
            <p className="font-semibold text-gray-600 lowercase">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="shadow-md bg-gray-200 flex justify-center md:justify-around gap-4 items-center p-4 font-bold rounded-lg flex-wrap">
            <Link
              to={location.pathname==="/profile"?"/profile" : "/admin-panel/profile"}
              className=" shadow-md  py-1 px-4 rounded-full hover:bg-[var(--secondary-color)] hover:text-white hover:scale-95 transition-all duration-300"
            >
              Personal Detail
            </Link>
            <Link
              to={ location.pathname==="/profile/update-password" ?"/profile/update-password" : "/admin-panel/profile/update-password"}
              className="transition-all duration-200 shadow-md  py-1 px-4 rounded-full hover:bg-[var(--secondary-color)] hover:text-white hover:scale-95"
            >
              Update Password
            </Link>
            <button className="transition-all duration-200 shadow-md  py-1 px-4 rounded-full hover:bg-[var(--secondary-color)] hover:text-white hover:scale-95 cursor-pointer" onClick={deleteHandler}>
              Delete Account
            </button>

            <button
              onClick={logoutHandler}
              className="group transition-all duration-200 shadow-md  py-1 px-4 rounded-full hover:bg-[var(--secondary-color)] hover:text-white hover:scale-95 cursor-pointer"
            >
              LogOut
              <i className="ri-logout-circle-r-fill ml-2 group-hover:text-yellow-600 "></i>
            </button>
          </div>

          <div className="shadow-md bg-gray-200 rounded-lg p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
