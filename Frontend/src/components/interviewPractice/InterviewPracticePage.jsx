import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllInterviewDetails,
  addNewQuestion,
  submitAnswerRedux,
  getInterviewById,
  getFeedbackHandler,
  deleteRedux,
} from "../../Redux/slices/interviewSlice";
import {toast} from 'react-toastify'

function InterviewPracticePage() {
  const dispatch = useDispatch();
  const navigateTo=useNavigate();

  const { loading, error, allQuestions, newQuestion,message } = useSelector(
    (state) => state.interview
  );
  const {isAuthenticated}=useSelector(state=>state.auth);


  const [isFull, setIsFull] = useState(true);
  const [indexValue, setIndexValue] = useState(0);
  const [itemData, setItemData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const[userLoader,setUserloader]=useState(false)
  const [reverseData,setReverseData]=useState([]);





  const fetchRecentTechnology=()=>{
    if (allQuestions) {
      setReverseData( Object.values(allQuestions).reverse());
      const reversed=Object.values(allQuestions).reverse();

      if (reversed.length > 0) {
      
        setItemData(reversed[0]);
      }
    }
  }


  useLayoutEffect(()=>{
    fetchRecentTechnology();
  },[allQuestions])



  const interviewSelectHandler = (item) => {
    // console.log("hello");
    setItemData(item);
    dispatch(getInterviewById(item._id));
  };

  useEffect(() => {
    dispatch(getAllInterviewDetails());
  }, []);

 

  const generateNewQuestionHandler = () => {
    // const { _id } = itemData;
    dispatch(addNewQuestion(itemData._id));
  };

  const getFeedbackButtonHandler=()=>{
    setUserloader(false);
    dispatch(getFeedbackHandler(itemData._id))
  }
  const answerSubmitHandler = () => {
    const data = { id: itemData._id, answer: inputValue };
    setUserloader(true);
    dispatch(submitAnswerRedux(data));
   
  };

  useEffect(() => {

    if(!isAuthenticated){
      navigateTo('/login')
    }

   
  }, [newQuestion]);


  const deleteHandler=()=>{
    
    dispatch(deleteRedux(itemData._id));
  }


  useEffect(()=>{
    if(error){
      toast.error(error);
    }
    if(message){
      toast.success(message);
    }
  },[message,error])

  return (
    <div className="md:pt-16 pt-18 bg-gray-300 min-h-[665px]">
      <div className="md:px-6 px-1 flex flex-row gap-2 h-full relative">
        {/* left section */}
      

        <div
          className={`${
            isFull ? "w-0" : "w-3/12"
          } hidden md:block transition-all duration-200 bg-gray-400 h-[665px] overflow-hidden  `}
        >
          <div className="bg-white w-full">
            <button className="font-bold text-xl transition-all duration-200 hover:scale-95 cursor-pointer ml-6">
              New
              <i className="ri-edit-circle-fill"></i>
            </button>
          </div>
          <div className="flex flex-col gap-1 py-4 px-2">
            {reverseData?.map((item, index) => (
              <div
                onClick={() => {
                  interviewSelectHandler(item);
                  setIndexValue(index);
                }}
                key={index}
                className={`${
                  index === indexValue && "bg-gray-500"
                } hover:bg-gray-500 transition-all flex justify-between duration-200 cursor-pointer px-4 py-1 rounded-md`}
              >
                <p className="capitalize">{item?.technology}</p>
                <button className="font-semibold hover:text-red-700 transition-all duration-200 cursor-pointer text-lg hover:scale-105" onClick={deleteHandler}>
                  <i className="ri-delete-bin-6-line"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* mobile view */}
        <div
          className={`${
            isFull ? "w-[200px]" : "w-0"
          }  absolute top-0 bg-white left-0 md:hidden h-[665px] overflow-hidden z-20 `}
        >
          <div className="bg-white w-full ">
            <button className="font-bold  transition-all duration-200 hover:scale-95 cursor-pointer ml-6">
              New
              <i className="ri-edit-circle-fill"></i>
            </button>
          </div>
          <div className="flex flex-col gap-1 py-4 px-2">
            {reverseData?.map((item, index) => (
              <div
                onClick={() => {
                  interviewSelectHandler(item);
                  setIndexValue(index);
                }}
                key={index}
                className={` ${
                  index === indexValue && "bg-gray-500"
                } hover:bg-gray-500 transition-all duration-200 flex justify-between cursor-pointer px-4 py-1 rounded-md`}
              >
                <p className="capitalize">{item?.technology}</p>

                <button className="font-semibold hover:text-red-700 transition-all duration-200 cursor-pointer text-lg hover:scale-105" onClick={deleteHandler}>
                  <i className="ri-delete-bin-6-line"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* right section */}
        <div
          className={`${
            isFull ? "w-full" : "md:w-9/12"
          }  w-full bg-gray-500  h-[665px] transition-all  duration-200 relative  z-10`}
        >
          <div className="bg-white w-full">
            <button
              className={`font-bold text-xl transition-all duration-200 hover:scale-95 cursor-pointer ${
                isFull ? "ml-50 md:ml-4" : "ml-4"
              }`}
              onClick={() => setIsFull(!isFull)}
            >
              <i className="ri-menu-search-fill"></i>
            </button>
          </div>

          {/* data section */}
          <div className="p-4 overflow-y-scroll flex flex-col gap-2 mb-60  overflow-x-hidden h-[480px] custom-scrollbar-hide scrollbar-none" 
             
             style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowY: "scroll",
            }}
          >
            {/* question section */}

         

            { newQuestion &&  newQuestion?.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 ">
                {item?.question && (
                  <div className="w-9/12 bg-gray-800 rounded-md p-4 text-white text-justify">
                    <p> {item?.question} </p>
                  </div>
                )}




                { item?.userAnswer && (
                  <div className="w-9/12 bg-gray-700 rounded-md p-4 text-white text-justify ml-auto">
                    <p> {item?.userAnswer} </p>
                  </div>
                )}




                {item?.feedBack && (
                  <div className="w-9/12 bg-gray-800 rounded-md p-4 text-white text-justify">
                    <pre className="text-xs text-wrap"> {item?.feedBack} </pre>
                  </div>
                )}


              </div>
            ))}



          </div>

          {/* loading area */}

          <div className="w-full absolute bottom-30 px-20 flex justify-between">
            <div>
              {loading && !userLoader && (
                <div className="w-full flex justify-center">
                  <div className="dots"></div>
                </div>
              )}

              
            </div>

            <div>
              {loading &&  userLoader && (
                <div className="w-full flex justify-center">
                  <div className="dots"></div>
                </div>
              )}
              
            </div>
          </div>
          {/* chat and button section */}

          <div
            className={`w-10/12 md:w-8/12 rounded-tl-lg rounded-tr-lg bg-gray-600 absolute bottom-0  mx-auto ${
              isFull ? "md:left-54" : "md:left-45"
            } left-8 space-y-2`}
          >
            <div>
              <input
                type="text"
                placeholder="Type Your Answer"
                className="w-full h-[70px] rounded-tl-lg rounded-tr-lg px-4 placeholder:text-white caret-white outline-none border-none text-white"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-2 md:gap-4 justify-between text-white pl-2 md:pl-10 pr-2 mb-2">
              <div className="flex gap-2 md:gap-4 ">
                <button
                  className="group  rounded-full border border-white w-fit px-2 cursor-pointer transition-all duration-200 hover:scale-95"
                  onClick={generateNewQuestionHandler}
                >
                  <i className="ri-add-line p-1 text-lg"></i>
                  <span className="hidden md:inline">New Question</span>
                </button>
                <button className=" rounded-full border border-white w-fit px-2 cursor-pointer transition-all duration-200 hover:scale-95" onClick={getFeedbackButtonHandler}>
                  <i className="ri-feedback-line p-1 text-lg"></i>

                  <span className="hidden md:inline">Get Feedback</span>
                </button>
              </div>

              <button
                className=" rounded-full border border-white w-fit px-2 cursor-pointer transition-all duration-200 hover:scale-95"
                onClick={answerSubmitHandler}
              >
                <i className="ri-feedback-line p-1 text-lg"></i>
                Submit
              </button>
            </div>
          </div>



        </div>


      </div>
    </div>
  );
}

export default InterviewPracticePage;
