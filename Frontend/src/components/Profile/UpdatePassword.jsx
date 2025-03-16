import React, { useEffect, useState } from "react";
import BtnButton from "../reuseCMP/BtnButton";
import Swal from "sweetalert";
import { toast } from "react-toastify";
import { updatePassword, clearAllError } from "../../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const obj = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { loading, message, error } = useSelector((state) => state.auth);
  const [passwordValue, setPasswordValue] = useState(obj);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPasswordValue({
      ...passwordValue,
      [name]: value,
    });
  };

  const passwordSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !passwordValue.oldPassword ||
      !passwordValue.confirmPassword ||
      !passwordValue.newPassword
    ) {
      new Swal({
        icon: "warning",
        text: "All Fields Required..",
      });
      return;
    }

    if (passwordValue.newPassword !== passwordValue.confirmPassword) {
      new Swal({
        icon: "warning",
        text: "Password Must be Same",
      });
      return;
    }

    dispatch(updatePassword(passwordValue));
    navigateTo("/profile");
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllError());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="w-full flex flex-col gap-4 px-6 pb-6">
      <div className="flex justify-between gap-6">
        <h4 className="font-bold text-green-700 text-md md:text-lg items-center">
          Update Password
        </h4>
      </div>

      <div className="w-full border-b-2 border-gray-300"></div>

      {/* password section */}

      <div className="flex flex-col gap-6 w-full text-center">
        <form
          className="w-full flex flex-row justify-around flex-wrap gap-3"
          onSubmit={passwordSubmitHandler}
        >
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="" className="font-medium text-gray-700">
              Old Password
            </label>
            <input
              type={`${isVisible ? "text" : "password"}`}
              value={passwordValue.oldPassword}
              name="oldPassword"
              onChange={inputHandler}
              placeholder="Enter Your Old Password"
              className="py-1 px-4 rounded-md outline-none border border-gray-400"
            />
            {isVisible ? (
              <i
                className="ri-eye-fill absolute bottom-1 right-2 cursor-pointer"
                onClick={() => setIsVisible(false)}
              ></i>
            ) : (
              <i
                className="ri-eye-off-fill absolute bottom-1 right-2"
                onClick={() => setIsVisible(true)}
              ></i>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="" className="font-medium text-gray-700">
              New Password
            </label>
            <input
              type={`${isVisible ? "text" : "password"}`}
              value={passwordValue.newPassword}
              name="newPassword"
              onChange={inputHandler}
              placeholder="Enter Your New Password"
              className="py-1 px-4 rounded-md outline-none border border-gray-400"
            />

            {isVisible ? (
              <i
                className="ri-eye-fill absolute bottom-1 right-2 cursor-pointer"
                onClick={() => setIsVisible(false)}
              ></i>
            ) : (
              <i
                className="ri-eye-off-fill absolute bottom-1 right-2"
                onClick={() => setIsVisible(true)}
              ></i>
            )}
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="" className="font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={`${isVisible ? "text" : "password"}`}
              value={passwordValue.confirmPassword}
              name="confirmPassword"
              onChange={inputHandler}
              placeholder="Enter Your Confirm Password"
              className="py-1 px-4 rounded-md outline-none border border-gray-400"
            />

            {isVisible ? (
              <i
                className="ri-eye-fill absolute bottom-1 right-2 cursor-pointer"
                onClick={() => setIsVisible(false)}
              ></i>
            ) : (
              <i
                className="ri-eye-off-fill absolute bottom-1 right-2"
                onClick={() => setIsVisible(true)}
              ></i>
            )}
          </div>
        </form>

        <BtnButton
          bgcolor={"--yellow"}
          hovercolor={"--secondary-color"}
          textcolor={"white"}
          loading={loading}
          spinner={"spinner2"}
          handler={passwordSubmitHandler}
        >
          Save Password
          <i className="ri-lock-password-fill ml-2"></i>
        </BtnButton>
      </div>
    </div>
  );
}

export default UpdatePassword;
