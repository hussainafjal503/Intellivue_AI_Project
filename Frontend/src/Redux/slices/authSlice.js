import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const storeUserCheck = localStorage.getItem("user");
// const storeUser =
//   storeUserCheck && storeUserCheck !== "undefined"
//     ? JSON.parse(storeUserCheck)
//     : null;

// //checking authentication field..
// const storedAuthCheck = localStorage.getItem("isAuthenticated");
// const storedAuth = storedAuthCheck && storedAuthCheck === "true" ? true : false;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    message: null,
    loading: false,
    isAuthenticated: false,
    otpVerified: false,
    otpSentStatus: false,
    tempUser: null,
    imageLoading:false
  },
  reducers: {
    storeTemp: (state, action) => {
      state.tempUser = action.payload;
    },
    //otp sending
    otpRequest: (state, action) => {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    otpSuccess: (state, action) => {
      // console.log(action.payload);
      state.message = action.payload;
      state.loading = false;
      state.error = null;
      state.otpSentStatus = true;
    },
    otpFailed: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    falseOtpSent: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },

    // otp verification
    otpVerifyRequest: (state, action) => {
      state.loading = true;
      state.message = null;
      state.error = null;
      state.otpVerified = false;
    },
    otpVerifySuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
      state.otpVerified = true;
    },
    otpVerifyFailed: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
      state.otpVerified = false;
    },
    otpVerifyFalse: (state, action) => {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
      state.otpVerified = false;
    },

    //registeration
    requestRegister: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      state.user = null;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.message = action.payload.message;
      state.user = action.payload.user;

      //saving the data in local storage
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("isAuthenticated", "true");
    },
    RegisterFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
      state.user = null;
    },
    RegisterFalse: (state, action) => {
      state.message = action.payload;
      state.error = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    requestLogin: (state, action) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.message = "";
      state.user = {};
    },
    successLogin: (state, action) => {
      state.loading = false;
      state.error = null;
      (state.isAuthenticated = true), (state.message = action.payload.message);
      state.user = action.payload.user;

      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("isAuthenticated", "true");
    },
    failedLogin: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
      state.isAuthenticated = false;
      state.message = null;
    },
    falseLogin: (state, action) => {
      state.message = action.payload;
      state.loading = false;
    },


    logoutRequest:(state,action)=>{
      state.loading=true;
      state.error=null;
      state.isAuthenticated=state.isAuthenticated;
      state.message=null;
    },
    logoutSuccess:(state,action)=>{
      state.loading=false;
      state.error=null;
      state.isAuthenticated=false;
      state.user=null;
      state.message=action.payload;

      localStorage.clear();

    },
    logoutFailed:(state,action)=>{
      state.error=action.payload;
      state.isAuthenticated=state.isAuthenticated;
      state.user=state.user;
      state.message=null;
      state.loading=false;
    },


    updatePasswordRequest:(state,action)=>{
      state.loading=true;
      state.message=null;
      state.error=null;
    },
    updatePasswordSuccess:(state,action)=>{
      state.loading=false;
      state.message=action.payload.message;
      state.user=action.payload.user;
      state.error=null;

    },
    updatePasswordFailed:(state,action)=>{
      state.error=action.payload;
      state.message=null;
      state.loading=false;

    },


    profileUpdateRequest:(state,action)=>{
      state.error=null;
      state.loading=true;
      state.message=null;
    },
    profileUpdateSuccess:(state,action)=>{
      state.user=action.payload.user;
      state.message=action.payload.message;
      state.loading=false;
      state.error=null;

    },
    profileUpdateFailed:(state,action)=>{
      state.user=state.user;
      state.message=null;
      state.error=action.payload;
    },


    updatePPRequest:(state,action)=>{
      state.imageLoading=true;
      state.error=null;
      state.message=null;
    },
    updatePPSuccess:(state,action)=>{
      // console.log(action.payload.user);
      state.imageLoading=false;
      state.message=action.payload.message;
      state.user=action.payload.user;


    },
    updatePPFailed:(state,action)=>{
      state.imageLoading=false;
      state.error=action.payload;
    },




      getUserRequest:(state,action)=>{
        state.message=null;
        state.error=null;
        state.user=null;
        state.isAuthenticated=false;
      },
      getUserSuccess:(state,action)=>{
          state.isAuthenticated=true;
          state.user=action.payload;
          state.error=null;
      },
      getUserFailed(state,action){
        state.error=action.payload;
        

      },

      sentDeleteAccountRequest(state,action){
        state.loading=true;
        state.message=null;
        state.error=null;
      },
      sentDeleteAccountSuccess(state,action){
        state.loading=false;
        state.message=action.payload;
        state.error=null;
      },
      sentDeleteAccountFailed(state,action){
        state.loading=false;
        state.error=action.payload;
      },

    

    clearAllErrorRequest: (state, action) => {
      state.error = null;
      state.user = state.user;
    },
    clearTempuser: (state) => {
      delete state.tempUser;
    },
  },
});

export const otpSent = (data) => async (dispatch) => {
  dispatch(authSlice.actions.storeTemp(data));
  const { email } = data;
  dispatch(authSlice.actions.otpRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/otp-send",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response);
    if (response.data.success === false) {
      dispatch(authSlice.actions.falseOtpSent(response?.data?.message));
      // console.log("response")
      return;
    }
    dispatch(authSlice.actions.otpSuccess(response?.data?.message));
    dispatch(authSlice.actions.clearAllErrorRequest());
  } catch (err) {
    console.log(`Error occured while sending otp : ${err}`);
    dispatch(authSlice.actions.otpFailed(err?.response?.data?.message));
  }
};

export const verifyOtp = (otp) => async (dispatch, getState) => {
  const data = getState();
  // console.log(data)
  const { email } = data?.auth?.tempUser;
  dispatch(authSlice.actions.otpVerifyRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/verify",
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === false) {
      console.log("inside false")
      dispatch(authSlice.actions.otpVerifyFalse(response?.data?.message));
      return;
    }
    dispatch(authSlice.actions.otpVerifySuccess(response?.data?.message));
    dispatch(authSlice.actions.clearAllErrorRequest());
  } catch (err) {
    console.log(`Error occured while verifiying Otp : ${err}`);
    dispatch(authSlice.actions.otpVerifyFailed(err?.response?.data?.message));
  }
};

export const Register = () => async (dispatch, getState) => {
  const data = getState()?.auth?.tempUser;
  // console.log(data);

  dispatch(authSlice.actions.requestRegister());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === false) {
      dispatch(authSlice.actions.RegisterFalse(response?.data?.message));
      return;
    }
    dispatch(authSlice.actions.RegisterSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrorRequest());
    dispatch(authSlice.actions.clearTempuser());
  } catch (err) {
    console.log(`Error occured while registration : ${err}`);
    dispatch(authSlice.actions.RegisterFailed(err?.response?.data?.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.requestLogin());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success === false) {
      dispatch(authSlice.actions.falseLogin(response.data.message));
      return;
    }
    dispatch(authSlice.actions.successLogin(response?.data));
    dispatch(authSlice.actions.clearAllErrorRequest());
  } catch (err) {
    console.log(`error Occured while login : ${err}`);
    dispatch(authSlice.actions.failedLogin(err?.response?.data?.message));
  }
};


export const logout=()=>async(dispatch)=>{

  dispatch(authSlice.actions.logoutRequest());
  try{
      const response=await axios.get("http://localhost:3000/api/v1/user/logout",{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })

      // console.log(`lgout:`,response);
      dispatch(authSlice.actions.logoutSuccess(response?.data?.message));
      dispatch(authSlice.actions.clearAllErrorRequest());
  }catch(err){
    console.log(`Error occured while logging out : ${err}`);
    dispatch(authSlice.actions.logoutFailed(err?.response?.data?.message));
  }

}



export const updatePassword=(data)=>async(dispatch)=>{
    try{
      dispatch(authSlice.actions.updatePasswordRequest());
      const response=await axios.post('http://localhost:3000/api/v1/user/update-password',data,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });

      dispatch(authSlice.actions.updatePasswordSuccess(response?.data));
      dispatch(authSlice.actions.clearAllErrorRequest());  

    }catch(err){
      console.log(`Error Occured while updating password : ${err}`);
      dispatch(authSlice.actions.updatePasswordFailed(err?.response?.data?.message));
    }
}


export const profileUpdate=(data)=>async(dispatch)=>{
  try{
    dispatch(authSlice.actions.profileUpdateRequest());
    const response=await axios.post('http://localhost:3000/api/v1/user/update-profile',data,{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    });
    
    // console.log(response);
    dispatch(authSlice.actions.profileUpdateSuccess(response?.data));
    dispatch(authSlice.actions.clearAllErrorRequest());

  }catch(err){
    console.log(`Error occured while profile updating: ${err}`);
    dispatch(authSlice.actions.profileUpdateFailed(err?.response?.data?.message));
  }
}

export const profilePictureUpdate=(file)=>async(dispatch)=>{
  try{
    // console.log(file);
    const formData=new FormData();
    formData.append("image",file);
    dispatch(authSlice.actions.updatePPRequest());
    const response=await axios.post('http://localhost:3000/api/v1/user/pp-update',formData,{
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });

  // console.log(response);
  dispatch(authSlice.actions.updatePPSuccess(response?.data));
  dispatch(authSlice.actions.clearAllErrorRequest());
  }catch(err){
    console.log(`Error occured while updating profile picture : ${err}`);
    dispatch(authSlice.actions.updatePPFailed(err?.response?.data?.message));
  }
}


export const getUserRedux=()=>async(dispatch)=>{
  dispatch(authSlice.actions.getUserRequest());
  try{
    const response=await axios.get("http://localhost:3000/api/v1/user/get-user-detail",{
      withCredentials:true
    });
    // console.log(response);
    dispatch(authSlice.actions.getUserSuccess(response?.data?.user));
    dispatch(authSlice.actions.clearAllErrorRequest());

  }catch(err){
    console.log(`Error occured while getting user details : ${err}`);
    dispatch(authSlice.actions.getUserFailed(err?.response?.data?.message));
  }

}



export const deleteAccountHandlerRedux=()=>async(dispatch)=>{
  dispatch(authSlice.actions.sentDeleteAccountRequest());
  try{
    const response=await axios.post('http://localhost:3000/api/v1/user/delete-account',{},{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    });

    // console.log(response);
    dispatch(authSlice.actions.sentDeleteAccountSuccess(response?.data?.message));
    dispatch(authSlice.actions.clearAllErrorRequest());

  }catch(err){
    console.log(`Error Occured while deleting account : ${err}`);
    dispatch(authSlice.actions.sentDeleteAccountFailed(err?.response?.data?.message));
  }
}



export const clearAllError = () => (dispatch) => {
  dispatch(authSlice.actions.clearAllErrorRequest());
};

export default authSlice.reducer;
