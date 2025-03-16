import React, { useEffect, useState } from "react";
import logo from "../../assets/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert";
import { otpSent, clearAllError } from "../../Redux/slices/authSlice";
import { toast } from "react-toastify";

function Register() {
  const { error, message, loading, otpSentStatus } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const obj = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(obj);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !formValue.firstName ||
      !formValue.lastName ||
      !formValue.email ||
      !formValue.password
    ) {
      new Swal({
        icon: "warning",
        text: "All Fields are required.",
      });
      return;
    }
    dispatch(otpSent(formValue));
  };

  useEffect(() => {
    if (otpSentStatus && message) {
      // console.log("hello");
      navigateTo("/signup-otp");
      toast.success(message);
    } else if (message) {
      toast.warning(message);
    }
    if (error) {
      toast.success(error);
      dispatch(clearAllError());
    }
  }, [dispatch, error, message, loading, otpSentStatus]);
  return (
    <div
      className="w-screen h-screen overflow-hidden flex justify-center items-center fixed z-50 top-0"
      style={{
        backgroundImage: `linear-gradient(to right top, #053731, #045244, #116f55, #288d64, #44ab6f)`,
      }}
    >
      <div
        className="shodow-lg rounded-lg w-full md:w-auto font-bold "
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "fit",
        }}
      >
        <div className="flex  md:flex-row flex-col gap-1 p-6 ">
          <div className="">
            <img src={logo} alt="" className="w-[350px] md:h-full h-[250px]" />
          </div>
          <div>
            <div>
              <h2 className="text-center">Intellivue</h2>
            </div>

            <div className="flex flex-col gap-3">
              <h3>
                <span className="text-green-500">Sign</span>Up
              </h3>
              <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">FirstName</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formValue.firstName}
                    onChange={inputHandler}
                    className="bg-transparent py-1 px-4 outline-none rounded-md border border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">LastName</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formValue.lastName}
                    onChange={inputHandler}
                    name="lastName"
                    className="bg-transparent py-1 px-4 outline-none rounded-md border border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formValue.email}
                    onChange={inputHandler}
                    name="email"
                    className="bg-transparent py-1 px-4 outline-none rounded-md border border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    autoComplete={formValue.password}
                    name="password"
                    value={formValue.password}
                    onChange={inputHandler}
                    className="bg-transparent py-1 px-4 outline-none rounded-md border border-black"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="font-bold bg-[var(--btn-color1)] py-1 px-4 w-30 rounded-md cursor-pointer hover:bg-[var(--secondary-color)] hover:text-white transition-all duration-200 hover:scale-90"
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <div className="spinner"></div>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>

              <div className="flex flex-row gap-1 font-medium text-sm">
                <p>Already have an Account?</p>
                <Link to={"/login"} className="text-green-500 font-semibold">
                  LogIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
