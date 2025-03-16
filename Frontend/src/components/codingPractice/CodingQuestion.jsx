import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import BtnButton from "../reuseCMP/BtnButton";
import { toast } from "react-toastify";
import Swal from "sweetalert";
import {
  generateQuestion,
  clearAllCodingError,
  submitAnswer,
  getFeedback,
  
} from "../../Redux/slices/codingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CodingQuestion() {
  const monaco = useMonaco();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [isFull, setIsFull] = useState(false);
  const [qVisible, setQVisible] = useState(false);
  const [answer, setSubmitAnswer] = useState("");
  const[btnVisible,setBtnVisible]=useState(0);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, message, question, isGenerated ,error, feedback } =
    useSelector((state) => state.coding);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const getQuestonHandler = useCallback(() => {
    // console.log("hello");
    dispatch(generateQuestion());
    setBtnVisible(1);
  }, []);

  // submit answer handler
  const submitAnswerHandler = useCallback(() => {
    if (!answer) {
      new Swal({
        icon: "warning",
        text: "Please write your answer",
      });
      return;
    }
    // console.log(answer)
    dispatch(submitAnswer(answer));
    setSubmitAnswer("");
    setBtnVisible(2);
  }, [answer]);

  //get Feedback handler
  const feedbackHandler = useCallback(() => {
    dispatch(getFeedback());
    setBtnVisible(0);
  }, []);
  // console.log(question)

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
      toast.warning("please login");
    }
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(message);
      dispatch(clearAllCodingError());
    }
  }, [message, error, loading, question,isGenerated, feedback]);

  return (
    <>
      {/* coding chat and editor section */}
      <div
        className={`flex flex-col md:flex-row gap-2 md:gap-4 md:mt-12 h-auto  `}
      >
        {/*************************** left section ************************************/}
        <div
          className={`shadow-lg ${
            isFull ? "w-0 " : "w-4/12  "
          } hidden md:block  h-[85vh]  overflow-hidden  bg-gray-300 transition-all duration-200 `}
        >
          <div className="mb-4 px-4 bg-white text-semibold text-center">
            Your Question
          </div>

          <div className="h-[70vh] overflow-y-auto">
            <div className="p-4   ">
              <div className="font-bold md:text-lg">
                {feedback && isGenerated === 0 ? (
                  <pre className="text-xs text-wrap">{feedback}</pre>
                ) : (
                  <pre className="text-xs text-wrap">{question}</pre>
                )}
              </div>
              <div className="border-b border-gray-500 py-2 mb-10"></div>
            </div>
          </div>

          <div className="  flex flex-row justify-around   gap-4 w-full  ">
            {
              btnVisible===0 ?
            <BtnButton
              bgcolor={"--secondary-color"}
              hovercolor={"--yellow"}
              textcolor={"white"}
              loading={ loading }
              spinner={"spinner"}
              handler={ getQuestonHandler }
            >
              Get Question
            </BtnButton> : loading &&
            <div className="spinner"></div>
            }
            {
              btnVisible===2 && 
            <BtnButton
              bgcolor={"--yellow"}
              hovercolor={"--secondary-color"}
              textcolor={"white"}
              loading={ loading }
              spinner={"spinner1"}
              handler={ feedbackHandler }
            >
              Feedback
            </BtnButton>
            }

          </div>
        </div>

        {/*************************** mobile view ****************************/}

        <div
          className={`shadow-lg ${
            qVisible ? "w-full block " : "hidden w-0 "
          } md:hidden block  h-[85vh] overflow-hidden bg-gray-300 transition-all duration-200 relative `}
        >
          <div className="mb-4 px-4 bg-white text-semibold text-center">
            Your Question
          </div>

          <div className="h-[70vh] overflow-y-auto">
            <div className="p-4   ">
              <div className="font-bold md:text-lg">
              {feedback && isGenerated === 0 ? (
                  <pre className="text-xs text-wrap">{feedback}</pre>
                ) : (
                  <pre className="text-xs text-wrap">{question}</pre>
                )}
              </div>
              <div className="border-b border-gray-500 py-2 mb-10"></div>
            </div>
          </div>

          <div className=" flex flex-row justify-around  gap-4 w-full   ">

            {
              btnVisible ===0 && 
            <BtnButton
              bgcolor={"--secondary-color"}
              hovercolor={"--yellow"}
              textcolor={"white"}
              loading={ loading }
              spinner={"spinner"}
              handler={ getQuestonHandler }
            >
              Get Question
            </BtnButton>
            }


{
  btnVisible===2 &&
            <BtnButton
              bgcolor={"--yellow"}
              hovercolor={"--secondary-color"}
              textcolor={"white"}
              loading={ loading }
              spinner={"spinner"}
              handler={ feedbackHandler }
            >
              Feedback
            </BtnButton>
}
          </div>
        </div>

        {/* ******************************right section *************************************/}
        <div
          className={` ${
            isFull ? "w-full " : "md:w-8/12"
          }  transition-all duration-200 relative `}
        >
          <div className="flex flex-row justify-between gap-2 w-full bg-white pl-2 pr-4">
            <div className="flex flex-row gap-4">
              <button
                className=" hidden md:block cursor-pointer hover:scale-90 transition-all duration-200"
                onClick={() => setIsFull(!isFull)}
              >
                <i className="ri-menu-search-fill ml-0 font-bold "></i>
              </button>

              <button
                className="md:hidden cursor-pointer hover:scale-90 transition-all duration-200"
                onClick={() => setQVisible(!qVisible)}
              >
                <i className="ri-question-fill"></i>
              </button>
            </div>

            <div className="flex flex-row  justify-around gap-2">
              <div className="text-xs md:text-md">
                <label
                  htmlFor=""
                  className="font-semibold text-green-600 mr-2 hidden md:inline-block"
                >
                  Select Language
                </label>
                <select
                  name="language"
                  className="outline-none border rounded-md px-2 border-gray-300"
                  id=""
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="">choose language</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="java">Java</option>
                  <option value="Cpp">C++</option>
                  <option value="python">Python</option>
                </select>
              </div>

              <div className="text-xs md:text-md">
                <label
                  htmlFor=""
                  className="font-semibold text-green-600 mr-2 hidden md:inline-block"
                >
                  Choose Theme
                </label>
                <select
                  name="theme"
                  id=""
                  className="outline-none border rounded-md px-2 border-gray-300"
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="vs">Light Theme</option>
                  <option value="vs-dark">Dark Theme</option>
                  <option value="hc-black">High Contrast</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-auto">
            <Editor
              height={`82vh`}
              defaultLanguage={language}
              defaultValue={answer ? answer: "// Write Your Code Here, I know You'r Genius" }
              theme={theme}
              onChange={(newInput) => {
                // console.log(newInput)
                // console.log(typeof(newInput))
                setSubmitAnswer(newInput);
              }}
            />
          </div>

          <div className="absolute bottom-0 right-0 z-10">
            {
              btnVisible===1 && 
            <BtnButton
              bgcolor={"--yellow"}
              hovercolor={"--secondary-color"}
              textcolor={"white"}
              loading={ loading }
              spinner={"spinner1"}
              handler={submitAnswerHandler}
            >
              Submit
            </BtnButton>
            }
          </div>
        </div>

        {/* right end here */}
      </div>
    </>
  );
}

export default CodingQuestion;
