import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    message: null,
    loading: false,
    error: null,
    userData: null,
    aiResponse: null,
  },
  reducers: {
    setUserdata: (state, action) => {
      state.userData = action.payload;
    },

    getAiResponseRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    getAiResponseSuccess(state, action) {
      state.loading = false;
      state.message = null;
      state.error = null;
      state.aiResponse = action.payload;
    },
    getAiResponseFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    clearAllErrorResumeRequest(state, action) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
  },
});

export const setUserTempData = (data) => (dispatch) => {
  dispatch(resumeSlice.actions.setUserdata(data));
};

export const getResponseRedux = (prompt) => async (dispatch) => {
  dispatch(resumeSlice.actions.getAiResponseRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/resume/search-keyword",
      { prompt },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(resumeSlice.actions.getAiResponseSuccess(response?.data?.data));
    dispatch(resumeSlice.actions.clearAllErrorResumeRequest());
  } catch (err) {
    console.log(`Error occured while getting response : ${err}`);
    dispatch(
      resumeSlice.actions.getAiResponseFailed(err?.response?.data?.message)
    );
  }
};

export const clearAllError = () => async (dispatch) => {
  dispatch(resumeSlice.actions.clearAllErrorResumeRequest());
};

export default resumeSlice.reducer;
