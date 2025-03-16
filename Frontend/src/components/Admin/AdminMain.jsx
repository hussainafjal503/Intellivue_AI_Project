import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllAdminData } from "../../Redux/slices/AdminSlices";

function AdminMain() {
  const adminMenu = [
    {
      icon: "ri-dashboard-fill",
      title: "Dashbord",
      href: "",
    },
    {
      icon: "ri-message-2-fill",
      title: "User Message",
      href: "/admin-panel/user-message",
    },

    {
      icon: "ri-profile-fill",
      title: "Profile",
      href: "/admin-panel/profile",
    },
    {
      icon: "ri-delete-back-2-line",
      title: "Delete Request",
      href: "/admin-panel/delete-request",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminData());
  }, [dispatch]);

  /***********************************		xml codes ****************/

  return (
    <div className=" bg-gray-300 min-h-screen h-auto relative z-50 w-full ">
      {/* sidebar section */}
      <div
        className={`hidden absolute top-0 w-2/12 transition-all duration-200 md:flex flex-col gap-4 p-4 bg-gray-200 rounded-tr-md rounded-br-md h-full  min-h-screen`}
      >
        {adminMenu?.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="font-semibold text-lg py-1 px-2 hover:bg-[var(--secondary-color)] rounded-md transition-all duration-200 hover:text-white pl-10"
          >
            <i className={`${item.icon} mr-2`}></i>

            {item.title}
          </Link>
        ))}
      </div>

      {/* exact section */}
      <div className="w-full flex flex-row ">
        <div className="hidden md:block md:w-2/12 "></div>
        <div className="w-full md:w-10/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
