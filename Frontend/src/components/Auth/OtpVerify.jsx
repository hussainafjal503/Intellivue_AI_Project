import "animate.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import pin from "../../assets/pin.png";
import BtnButton from "../reuseCMP/BtnButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllError,
  verifyOtp,
  Register,
} from "../../Redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function OtpVerify() {
  const [isFocused, setIsFocused] = useState(null);
  const inputRef = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState([]);

  const { message, error, loading, otpVerified, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value.length === 1 && index < inputRef.length - 1) {
      inputRef[index + 1].current.focus();
    }
  };

  const keyDownHandler = (e, index) => {
    const newOtp = [...otp];
    newOtp.splice(index, 1);
    setOtp(newOtp);
    if (e.key === "Backspace" && index > 0 && e.target.value.length === 0) {
      inputRef[index - 1].current.focus();
    }
  };

  const otpSubmitHandler = (e) => {
    e?.preventDefault();
    const submitOpt = otp.join("");
    dispatch(verifyOtp(submitOpt));
  };

  const otpCallback = useCallback(otpSubmitHandler, [otp]);

  const ContinueHandler = useCallback(() => {
    dispatch(Register());
  }, []);

  useEffect(() => {
    if (otpVerified && message) {
      toast.success(message);
    }
    else if (isAuthenticated) {
      navigateTo("/");
      toast.success(message);
    }
    else if (message){
      toast.warning(message);
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllError());
    }
    
  }, [loading, error, otpVerified, message, dispatch, isAuthenticated]);

  return (
    <div
      className="w-screen h-screen overflow-hidden flex justify-center items-center fixed z-50 top-0"
      style={{
        backgroundImage: `linear-gradient(to right top, #053731, #045244, #116f55, #288d64, #44ab6f)`,
      }}
    >
      <div className="h-screen sm:h-auto shadow-md rounded-md flex justify-center items-center flex-col p-6 gap-8 bg-white">
        <div>
          <img src={pin} alt="" className="w-[120px] md:w-[150px]" />
        </div>
        <div className="font-bold flex flex-col justify-center items-center gap-6">
          <div className="text-2xl md:text-3xl flex flex-col gap-1 leading-5 ">
            <span className="text-green-500">OTP </span>
            <span className="pl-10">Verification</span>
          </div>
          <p className="text-center text-wrap">
            Enter the OTP sent to your registered email <br />
            <span>To verify your identity</span>
          </p>
          <form
            action=""
            className="flex flex-col gap-3 items-center"
            onSubmit={otpSubmitHandler}
          >
            <div className="flex flex-row gap-2">
              {inputRef?.map((ref, index) => (
                <input
                  key={index}
                  type="text"
                  ref={ref}
                  maxLength={1}
                  className={`text-black rounded-full w-10 h-10 border border-green-500 text-center text-lg outline-none ${
                    isFocused == index ? "bg-green-600" : "bg-white text-black"
                  }`}
                  onFocus={() => setIsFocused(index)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => keyDownHandler(e, index)}
                />
              ))}
            </div>
            {otpVerified && (
              <div className="flex justify-center">
                <i className="ri-check-double-line text-green-500 text-2xl animate__animated animate__zoomIn"></i>
              </div>
            )}
            {!otpVerified && (
              <BtnButton
                bgcolor={"--secondary-color"}
                hovercolor={"--yellow"}
                textcolor={"white"}
                loading={loading}
                spinner={"spinner"}
                handler={otpCallback}
              >
                Verify
              </BtnButton>
            )}
          </form>

          <div className="-mt-2">
            {otpVerified && (
              <BtnButton
                bgcolor={"--yellow"}
                hovercolor={"--secondary-color"}
                textcolor={"white"}
                loading={loading}
                spinner={"spinner2"}
                handler={ContinueHandler}
              >
                Continue
              </BtnButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
