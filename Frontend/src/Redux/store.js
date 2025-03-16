import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import authSlice from "./slices/authSlice";
import codingSlice from "./slices/codingSlice";
import interviewSlice from "./slices/interviewSlice";
import roadmapSlice from './slices/roadmapSlice';
import resumeSlice from './slices/ResumeSlice';
import adminSlice from './slices/AdminSlices'

const store = configureStore({
  reducer: {
    auth: authSlice,
    coding: codingSlice,
    interview: interviewSlice,
    roadmap:roadmapSlice,
    resume:resumeSlice,
    admin:adminSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
