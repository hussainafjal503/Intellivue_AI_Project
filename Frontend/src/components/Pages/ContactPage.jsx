import React, { useEffect, useState } from "react";
import BtnButton from "../reuseCMP/BtnButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { sendMessgeHandler } from "../../Redux/slices/AdminSlices";

function ContactPage() {
  const dispatch = useDispatch();
  const obj = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formValue, setFormValue] = useState(obj);
  const { loading, reduxError,message } = useSelector((state) => state.admin);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(sendMessgeHandler(formValue));
	setFormValue(obj);
  };

  useEffect(() => {
    if (reduxError) {
      toast.warning(reduxError);
    }else if(message){

		toast.success("Message Sent..")
	}
  }, [reduxError]);

  return (
    <div className="pt-20">
      <div className="px-4 md:px-16 w-full">
        <div className="space-y-4">
          <p>Get Started</p>
          <div className="font-bold text-4xl md:text-6xl">
            <h4>Get in touch with us.</h4>
            <h4>We're here to assist you.</h4>
          </div>
        </div>

        <div className="mt-16 w-full">
          <form
            action=""
            className="flex flex-col gap-6 w-full text-xs md:text-lg"
          >
            <div className="flex flex-row gap-3 md:gap-8 w-full">
              <input
                type="text"
                placeholder="Your Name"
                name="fullName"
                value={formValue.fullName}
                onChange={inputHandler}
                className="border-b border-gray-300 outline-none w-full "
              />

              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={formValue.email}
                onChange={inputHandler}
                className="border-b border-gray-300 outline-none w-full"
              />
              <input
                type="text"
                placeholder="Phone Number (optional)"
                name="phone"
                value={formValue.phone}
                onChange={inputHandler}
                className="border-b border-gray-300 outline-none w-full"
              />
            </div>
            <div>
              <textarea
                id=""
                placeholder="Message"
                name="message"
                value={formValue.message}
                onChange={inputHandler}
                className="border-b border-gray-300 outline-none w-full resize-none md:row-span-6 row-span-4"
              ></textarea>
            </div>

            <div>
              <BtnButton
                bgcolor={"--secondary-color"}
                hovercolor={"--yellow"}
                textcolor={"white"}
                loading={loading}
                spinner={"spinner"}
                handler={submitHandler}
              >
                Leave us Message
              </BtnButton>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-gray-200 px-8 md:px-44 mt-10 py-8 flex flex-col md:flex-row gap-6  justify-around w-full ">
        <div className="space-y-4  w-[350px] p-0 m-0">
          <p>Contact Info</p>
          <h4 className="font-bold text-4xl ">
            We are always happy to assist you.
          </h4>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Email Address</p>
          <div className="border-b w-10"></div>
          <p>help@gmail.com</p>

          <div className="space-y-1">
            <p>Assistance hours:</p>
            <p>Monday-Friday</p>
            <p> 6am to 8pm Est</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Number</p>
          <div className="border-b w-10"></div>
          <p>(808) 123456789</p>

          <div className="space-y-1">
            <p>Assistance hours:</p>
            <p>Monday-Friday</p>
            <p> 6am to 8pm Est</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
