import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const storedData = localStorage.getItem("interviewData");

// Ensure `newQuestion` is always an array
const interviewData =
  storedData && storedData !== "undefined"
    ? Array.isArray(JSON.parse(storedData))
      ? JSON.parse(storedData)
      : [JSON.parse(storedData)] // Wrap in an array if it's an object
    : [];

// console.log(interviewData)

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    loading: false,
    error: null,
    message: null,
    technology: null,
    allQuestions: null,
    newQuestion: [],
  },
  reducers: {
    createInterviewRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createInterviewSuccess(state, action) {
      state.loading = false;
    },
    createInterviewFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    addQuestionRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addQuestionSuccess: (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.error = null;
      state.newQuestion.push(action.payload);

      localStorage.setItem("interviewData", JSON.stringify(action.payload));
    },
    addQuestionFailed: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    getallInterviewRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllInterviewSuccess(state, action) {
      state.loading = false;
      state.allQuestions = action.payload;
      state.error = null;
      state.message = null;
    },
    getAllInterviewFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    getAllQuestionByIdRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllQuestionByIdSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.newQuestion = [...action?.payload?.data?.questions];
      // console.log(action.payload.data?.questions);

      sessionStorage.setItem(
        "interviewData",
        JSON.stringify(action.payload?.data?.questions)
      );
    },
    getAllQuestionByIdFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // submitting the answer

    submitAnswerRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    submitAnswerSuccess(state, action) {
      state.loading = false;
      state.error = null;

      const backup = [...state.newQuestion];
      // console.log(backup);
      // console.log(	backup[backup.length-1])
      backup[backup.length - 1] = action.payload;

      state.newQuestion = backup;
      // localStorage.setItem("interviewData",JSON.stringify(action.payload));
    },
    submitAnswerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //get feedback
    getFeedbackRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getFeedbackSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      const backup = [...state.newQuestion];
      // console.log(backup);
      // console.log(	backup[backup.length-1])
      backup[backup.length - 1] = action.payload;
      state.newQuestion = backup;

      localStorage.setItem("interviewData", JSON.stringify(action.payload));
    },
    getFeedbackFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteRequest(state, action) {
      state.message = null;
      state.error = null;
    },
    deleteSuccess(state, action) {
      state.allQuestions = action.payload?.data?.interview;
      state.error = null;
      state.message = action.payload?.message;
      localStorage.removeItem("interviewData");
      state.newQuestion = null;
    },
    deleteFailed(state, action) {
      state.error = action.payload;
      state.message = null;
    },

    clearInterviewError(state, action) {
      state.error = null;
      state.allQuestions = state.allQuestions;
      state.technology = state.technology;
    },
  },
});

export const createInterviewTechnolgy = (technology) => async (dispatch) => {
  dispatch(interviewSlice.actions.createInterviewRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/interview/create-interview",
      { technology },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    dispatch(interviewSlice.actions.createInterviewSuccess());
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(
      `Error Occured while creating interview with Technology : ${err}`
    );
    dispatch(
      interviewSlice.actions.createInterviewFailed(err?.response?.data?.message)
    );
  }
};

export const getAllInterviewDetails = () => async (dispatch) => {
  dispatch(interviewSlice.actions.getallInterviewRequest());
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/interview/getall-interview",
      {
        withCredentials: true,
      }
    );
    // console.log(response);
    dispatch(
      interviewSlice.actions.getAllInterviewSuccess(
        response?.data?.data?.interview
      )
    );
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(`Error Occured while in get All Interview details : ${err}`);
    dispatch(
      interviewSlice.actions.getAllInterviewFailed(err?.response?.data?.message)
    );
  }
};

export const addNewQuestion = (id) => async (dispatch) => {
  dispatch(interviewSlice.actions.addQuestionRequest());

  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/interview/${id}/add-question`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    dispatch(interviewSlice.actions.addQuestionSuccess(response?.data?.data));
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(`Error occured in add new question : ${err}`);
    dispatch(
      interviewSlice.actions.addQuestionFailed(err?.response?.data?.message)
    );
  }
};

export const submitAnswerRedux = (data) => async (dispatch) => {
  dispatch(interviewSlice.actions.submitAnswerRequest());
  try {
    const { id, answer } = data;
    const response = await axios.put(
      `http://localhost:3000/api/v1/interview/${id}/submit-answer`,
      { answer },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response);

    dispatch(interviewSlice.actions.submitAnswerSuccess(response?.data?.data));
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(`Error Occured while submitting the answer : ${err}`);
    dispatch(
      interviewSlice.actions.submitAnswerFailed(err?.response?.data?.message)
    );
  }
};

export const getInterviewById = (id) => async (dispatch) => {
  // console.log(id);
  dispatch(interviewSlice.actions.getAllQuestionByIdRequest());
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/interview/getInterview-detail/${id}`,
      {
        withCredentials: true,
      }
    );
    // console.log(response);
    dispatch(interviewSlice.actions.getAllQuestionByIdSuccess(response?.data));
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(`Error occured while getting interview detail by id : ${err}`);
    dispatch(
      interviewSlice.actions.getAllQuestionByIdFailed(
        err?.response?.data?.message
      )
    );
  }
};

export const getFeedbackHandler = (id) => async (dispatch) => {
  dispatch(interviewSlice.actions.getFeedbackRequest());
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/interview/${id}/ai-feedback`,
      {},
      {
        withCredentials: true,
      }
    );
    // console.log(response);
    dispatch(interviewSlice.actions.getFeedbackSuccess(response?.data?.data));
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(`Error Occured white getting feedback ${err}`);
    dispatch(
      interviewSlice.actions.getFeedbackFailed(err?.response?.data?.message)
    );
  }
};

export const deleteRedux = (id) => async (dispatch) => {
  dispatch(interviewSlice.actions.deleteRequest());
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/interview/delete-interview/${id}`,
      {
        withCredentials: true,
      }
    );

    // console.log(response);
    dispatch(interviewSlice.actions.deleteSuccess(response?.data));
    dispatch(interviewSlice.actions.clearInterviewError());
  } catch (err) {
    console.log(`Error Occured while deleting the inteview : ${err}`);
    dispatch(interviewSlice.actions.deleteFailed(err?.response?.data?.message));
  }
};

export const clearAllInterviewError = () => async (dispatch) => {
  dispatch(interviewSlice.actions.clearInterviewError());
};

export default interviewSlice.reducer;
