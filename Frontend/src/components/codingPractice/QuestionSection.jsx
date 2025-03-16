import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllQuestion,
  getSingleQuestion,
  clearAllCodingError,
  deleteQuestion
} from "../../Redux/slices/codingSlice";

function QuestionSection() {
  const { allQuestion, singleData } = useSelector((state) => state.coding);
  const dispatch = useDispatch();
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    dispatch(getAllQuestion());
  }, [singleData]);

  const getDataHandler = (id) => {
    dispatch(getSingleQuestion(id));
  };

  const deleteCodeHandler =(id)=>{
	dispatch(deleteQuestion(id));
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 h-screen ">
      {/* left  */}
      <div
        className={` ${
          isFull ? "w-0" : "md:w-3/12"
        } bg-[var(--secondary-color)] text-white font-medium shadow-md  rounded-md h-auto md:min-h-screen transition-all duration-200 overflow-x-hidden`}
      >
        <div className="flex flex-col gap-1 p-4">
          {allQuestion?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between hover:bg-[var(--primary-color)] transition-all duration-300 p-2 rounded-md cursor-pointer"
              onClick={() => getDataHandler(item._id)}
            >
              <p>
                {item.codeQuestion.substring(
                  20,
                  item.codeQuestion.indexOf("\n")
                )}
              </p>
              <button className="cursor-pointer hover:scale-115 transition-all duration-200 font-xl hover:text-red-500" onClick={()=>deleteCodeHandler(item._id)}>
			  <i className="ri-delete-bin-6-fill"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* right section */}
      <div
        className={` ${
          isFull ? "w-full" : "md:w-9/12"
        } bg-[var(--primary-color)] rounded-md transition-all duration-200 h-full overflow-hidden  `}
      >
        <div className="w-full bg-[var(--secondary-color)] text-white">
          <button
            className="font-bold text-xl transition-all duration-300 hover:scale-90 cursor-pointer pl-6"
            onClick={() => setIsFull(!isFull)}
          >
            <i className="ri-indent-decrease"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto overflow-x-hidden w-full text-white flex flex-col gap-4 h-full relative pb-10">
          {/* question div */}

          {singleData?.codeQuestion && (
            <div className="w-11/12 md:w-8/12 bg-gray-600 p-2 rounded-md ml-auto relative z-0">
              <pre className="text-wrap text-xs whitespace-pre-wrap break-words overflow-auto">
                {singleData?.codeQuestion}
              </pre>
            </div>
          )}

          {/* answer section */}
          {singleData?.userAnswer && (
            <div className="w-11/12 md:w-8/12 bg-[var(--secondary-color)] p-2 rounded-md  relative z-0">
              <pre className="text-wrap text-xs whitespace-pre-wrap break-words overflow-auto">{singleData?.userAnswer}</pre>
            </div>
          )}

          {singleData?.reviewFeedback && (
            <div className="w-11/12 md:w-8/12 bg-gray-600 p-2 rounded-md ml-auto relative mb-8 -z-0">
              <pre className="text-wrap text-xs whitespace-pre-wrap break-words overflow-auto">
                {singleData.reviewFeedback}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionSection;
