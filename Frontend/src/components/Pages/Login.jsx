import React, { useEffect, useState } from "react";
import logo from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearAllError, login } from "../../Redux/slices/authSlice";
import BtnButton from "../reuseCMP/BtnButton";
import Swal from 'sweetalert';

function Login() {
  const { isAuthenticated, loading, error, message,user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const obj = {
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
    if(!formValue.email || !formValue.password){
      new Swal({
        icon:"warning",
        text:"Please Enter Your Credentials"
      })
      return;
    }
    dispatch(login(formValue));
  };

  useEffect(() => {

    if (isAuthenticated && user.role==="user") {
      navigateTo("/");
      toast.success(message);
    }

    if (isAuthenticated && user.role==="admin") {
      navigateTo("/admin-panel");
      toast.success(message);
    }
    
    else if (error) {
      toast.error(error);
      dispatch(clearAllError());
    }
    
  }, [dispatch, error, message, isAuthenticated, loading]);
  return (
    <div
      className="w-screen h-screen overflow-hidden flex justify-center items-center z-50 fixed top-0"
      style={{
        backgroundImage: `linear-gradient(to right top, #053731, #045244, #116f55, #288d64, #44ab6f)`,
      }}
    >
      <div
        className="shodow-lg rounded-lg w-full md:w-auto font-bold h-full md:h-auto"
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
                {" "}
                <span className="text-green-500">Log</span>In
              </h3>
              <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formValue.email}
                    onChange={inputHandler}
                    className="bg-transparent py-1 px-4 outline-none rounded-md border border-black"
                  />
                </div>
                <div className="flex flex-col gap-1 ">
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
                  <Link className="text-blue-500 absoulte right-0 bottom-0 text-right cursor-pointer text-sm hover:scale-90 transition-all duration-200 hover:text-blue-600">
                    Forget Password
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="font-bold bg-[var(--btn-color1)] py-1 px-4 w-30 rounded-md cursor-pointer hover:bg-[var(--secondary-color)] hover:text-white transition-all duration-200 hover:scale-90"
                  >
                    {
                      loading ? <div className="flex justify-center items-center"> 
                        <div className="spinner"></div>
                      </div> : "Submit"
                    }
                  </button>
                </div>
              </form>

              <div className="flex flex-row gap-1 font-medium text-sm">
                <p>Don't have an Account?</p>
                <Link to={"/signup"} className="text-green-500 font-semibold">
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
