import "remixicon/fonts/remixicon.css";
import "./App.css";

import { useDispatch } from "react-redux";
import { getUserRedux } from "./Redux/slices/authSlice";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Navbar from "./components/Pages/Navbar";
import Register from "./components/Pages/Register";
import Footer from "./components/Pages/Footer";
import OtpVerify from "./components/Auth/OtpVerify";
import Profile from "./components/Pages/Profile";
import PersonalDetails from "./components/Profile/PersonalDetails";
import UpdatePassword from "./components/Profile/UpdatePassword";
import CodingHome from "./components/codingPractice/CodingHome";
import CodingQuestion from "./components/codingPractice/CodingQuestion";
import QuestionSection from "./components/codingPractice/QuestionSection";
import InterviewHome from "./components/interviewPractice/interviewHome";
import InterviewPracticePage from "./components/interviewPractice/InterviewPracticePage";
import ResumeHome from "./components/Resume/ResumeHome";
import ResumeForm from "./components/Resume/ResumeForm";
import RoadMapHome from "./components/RoadMaps/RoadMapHome";
import RoadMapData from "./components/RoadMaps/RoadMapData";
import ResumePreviewDetails from "./components/Resume/ResumePreviewDetails";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AboutPage from "./components/Pages/AboutPage";
import ContactPage from "./components/Pages/ContactPage";
import AdminMain from "./components/Admin/AdminMain";
import ProtectedRouteAdmin from "./components/Auth/ProtectedRouteAdmin";
import Dashborad from "./components/Admin/Dashborad";
import UserMessage from "./components/Admin/UserMessage";
import DeleteRequest from "./components/Admin/DeleteRequest";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRedux());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signup-otp" element={<OtpVerify />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />

        {/* admin pannel request */}
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/admin-panel" element={<AdminMain />}>
            <Route index element={<Dashborad />} />
            <Route path="user-message" element={<UserMessage/>}/>
            <Route path="delete-request" element={<DeleteRequest/>}/>



            <Route path="profile" element={<Profile />}>
              <Route index element={<PersonalDetails />} />
              <Route path="update-password" element={<UpdatePassword />} />
            </Route>



          </Route>

        

        </Route>





        <Route element={<ProtectedRoute />}>

         

          {/* profile section */}

        
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalDetails />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>

          {/* coding practice section */}
          <Route path="/coding-practice" element={<CodingHome />}>
            <Route index element={<CodingQuestion />} />
            <Route path="coding-questions" element={<QuestionSection />} />
          </Route>

          {/* interview section */}
          <Route path="/interview-practice" element={<InterviewHome />} />
          <Route
            path="/interview-practice/question"
            element={<InterviewPracticePage />}
          />

          {/* resume section */}
          <Route path="/resume" element={<ResumeHome />} />
          <Route path="/resume-form" element={<ResumeForm />} />
          <Route path="/resume-preview" element={<ResumePreviewDetails />} />

          {/* roadMaps */}
          <Route path="/roadmaps" element={<RoadMapHome />} />
          <Route path="/roadmaps/:id" element={<RoadMapData />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
