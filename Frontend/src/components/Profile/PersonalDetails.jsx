import React, { useEffect, useState } from "react";
import BtnButton from "../reuseCMP/BtnButton";
import { useSelector,useDispatch } from "react-redux";
import {profileUpdate,clearAllError} from '../../Redux/slices/authSlice';
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

function PersonalDetails() {
  const { user,message,error,loading } = useSelector((state) => state.auth);
  const obj = {
    firstName: user?.firstName ? user?.firstName : "",
    lastName: user?.lastName ? user?.lastName : "",
    gender: user?.gender ? user?.gender : "",
    dob: user?.dob ? user?.dob : "",
    about: user?.about ? user?.about : "",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [formValue, setFormValue] = useState(obj);
  const dispatch=useDispatch();
  const navigateTo=useNavigate();

  const editHandler = () => {
    setIsEdit(true);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();

    const {gender}=formValue;
    formValue.gender=gender.toLowerCase();
    console.log(formValue);
    dispatch(profileUpdate(formValue));
  

  };

  useEffect(()=>{
    if(message && isEdit){
      toast.success(message);
      setIsEdit(false);
      navigateTo('/profile');
      
    }
    if(error){
      toast.error(error);
      dispatch(clearAllError());
    }
  },[user,message,error,loading])
  

  return (
    <div className="w-full flex flex-col gap-4 px-6 pb-6">
      <div className="flex justify-between gap-6">
        <h4 className="font-bold text-green-700 text-md md:text-lg items-center">
          {isEdit ? "Edit Profile" : "Personal Information"}
        </h4>
        {isEdit ? (
          <BtnButton
            bgcolor={"--secondary-color"}
            hovercolor={"--yellow"}
            textcolor={"white"}
            loading={loading}
            spinner={"spinner"}
            handler={profileSubmitHandler}
          >
            Save
            <i className="ri-save-fill ml-2"></i>
          </BtnButton>
        ) : (
          <BtnButton
            bgcolor={"--yellow"}
            hovercolor={"--secondary-color"}
            textcolor={"white"}
            loading={loading}
            spinner={"spinner2"}
            handler={editHandler}
          >
            Edit
            <i className="ri-pencil-fill ml-2"></i>
          </BtnButton>
        )}
      </div>
      {/* details of the user */}
      <div className="w-full border-b-2 border-gray-300"></div>
      <form className="flex flex-col gap-3 md:flex-row justify-around flex-wrap">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col capitalize ">
            <label htmlFor="" className="text-sm text-gray-500 font-medium">
              First Name
            </label>
            {isEdit ? (
              <input
                type="text"
                placeholder="First Name"
                value={formValue?.firstName}
                name="firstName"
                onChange={inputHandler}
                className="py-1 px-4 rounded-md outline-none border border-gray-400"
              />
            ) : (
              <p className="text-medium font-semibold ">{user?.firstName}</p>
            )}
          </div>

          <div className="flex flex-col capitalize w-fit">
            <label htmlFor="" className="text-sm text-gray-500 font-medium">
              Email
            </label>
            <p className="text-sm font-semibold lowercase">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col capitalize  ">
            <label htmlFor="" className="text-sm text-gray-500 font-medium">
              Last Name
            </label>
            {isEdit ? (
              <input
                type="text"
                placeholder="Last Name"
                value={formValue?.lastName}
                name="lastName"
                onChange={inputHandler}
                className="py-1 px-4 rounded-md outline-none border border-gray-400"
              />
            ) : (
              <p className="text-medium font-semibold ">{user?.lastName}</p>
            )}
          </div>

          <div className="flex flex-col capitalize w-fit">
            <label htmlFor="" className="text-sm text-gray-500 font-medium">
              Gender
            </label>

            {isEdit ? (
              <input
                type="text"
                placeholder="Gender"
                value={formValue?.gender}
                name="gender"
                onChange={inputHandler}
                className="py-1 px-4 rounded-md outline-none border border-gray-400"
              />
            ) : (
              <p className="text-medium font-semibold ">
                {user?.gender ? user?.gender : "-------"}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col capitalize ">
            <label htmlFor="" className="text-sm text-gray-500 font-medium">
              Date of Birth
            </label>

            {isEdit ? (
              <input
                type="date"
                placeholder="Date of Birth"
                value={formValue?.dob}
                name="dob"
                onChange={inputHandler}
                className="py-1 px-4 rounded-md outline-none border border-gray-400"
              />
            ) : (
              <p className="text-medium font-semibold ">
                {user?.dob ? new Date(user?.dob).toLocaleDateString() : "-------"}
              </p>
            )}
          </div>

          <div className="flex flex-col capitalize w-fit">
            <label htmlFor="" className="text-sm text-gray-500 font-medium">
              User Role
            </label>
            <p className="text-medium font-semibold ">{user?.role}</p>
          </div>
        </div>

        <div className="w-full border-b-2 border-gray-300 my-6"></div>
        <div className="w-full">
          <p className="font-bold text-green-700 text-md md:text-lg items-center mb-2">
            About Section
          </p>

          {isEdit ? (
            <textarea
              name="about"
              id=""
              placeholder="Share Your Story.."
              className="w-full resize-none border border-gray-300  outline-none md:py-2 md:px-6 px-1 py-1 text-center  "
              rows={5}
              value={formValue.about}
              onChange={inputHandler}
            ></textarea>
          ) : (
            <textarea
              name=""
              id=""
              className="w-full resize-none border border-gray-300  outline-none md:py-2 md:px-6 px-1 py-1 text-center  "
              rows={5}
              readOnly
              value={
                user?.about ? user?.about : "You haven’t shared your story yet!"
              }
            ></textarea>
          )}

          
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
