import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMessageHandler,
  deleteMessageRedux,
} from "../../Redux/slices/AdminSlices";

function UserMessage() {
  const dispatch = useDispatch();
  const { allMessage } = useSelector((state) => state.admin);
  // console.log(allMessage);

  useEffect(() => {
    dispatch(getAllMessageHandler());
  }, [allMessage]);

  const [messageData, setMessageData] = useState(null);

  function filterMessageData(id) {
    const data = allMessage.filter((mes) => mes._id === id);
    // console.log(data);
    setMessageData(data[0]);
  }

  const deleteMessageHandler = (id) => {
    dispatch(deleteMessageRedux(id));
    setMessageData(null);
  };

  return (
    <div className="w-full">
      <AdminNav />

      <div className="flex flex-col md:flex-row gap-2 md:pr-6  md:h-full overflow-y-auto">
        <div className="w-full md:w-4/12 shadow-teal-700 p-4 flex flex-col gap-3 h-auto shadow-md overflow-y-auto md:min-h-[600px]">
          {allMessage?.map((item, index) => (
            <button
              key={index}
              className="hover:bg-gray-200 rounded-md py-1 px-4 transition-all duration-200 cursor-pointer flex flex-row justify-between"
              onClick={() => filterMessageData(item._id)}
            >
              <span className="capitalize">{item.fullName}</span>
              <span
                className="inline-block hover:scale-110 transiton-all duration-200 hover:text-red-500"
                onClick={() => deleteMessageHandler(item._id)}
              >
                <i className="ri-chat-delete-fill text-lg"></i>
              </span>
            </button>
          ))}
        </div>

        {/* message section */}
        <div className="w-full md:w-8/12  p-4 h-fit">
          {messageData ? (
            <div className="flex flex-row justify-around w-full h-auto">
              <div className="flex flex-col gap-4 w-ft">
                <label htmlFor="">User Name : </label>
                <label htmlFor="">Email : </label>
                {messageData.phone && <label htmlFor="">Phone Number : </label>}
                <label htmlFor="">Message : </label>
              </div>

              <div className="flex flex-col gap-4  w-fit">
                <p className="text-semibold text-green-600 capitalize ml-6">
                  {messageData.fullName}
                </p>
                <p className="text-semibold text-green-600  ml-6">
                  {messageData.email}
                </p>
                {messageData.phone && (
                  <p className="text-semibold text-green-600  ml-6">
                    {messageData.phone}
                  </p>
                )}
                <p className="text-semibold text-green-600  ml-6">
                  {messageData.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 font-bold text-gray-700 items-center justify-center h-full">
              <span>
                <i className="ri-seo-line text-6xl"></i>
              </span>
              <p>There is no Message Found </p>
            </div>
          )}

          <div className="border-b-2  text-yellow-600 my-4"></div>

          <div className="flex flex-row justify-around relative">
            <div>
              <p className="text-9xl">🤩</p>
              <p>
                <i className="ri-emoji-sticker-fill text-9xl text-teal-600"></i>
              </p>
              <p className="text-9xl absolute md:top-60 top-40 left-30 md:left-50 ">
                😍
              </p>
            </div>
            <div>
              <p>
                <i className="ri-emoji-sticker-fill text-9xl text-teal-600 "></i>
              </p>
              <p className="text-9xl">🥰</p>
              <p className="text-9xl absolute md:top-20 top-0 left-30 md:left-70">
                🤪
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
