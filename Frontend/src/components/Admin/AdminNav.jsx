import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function AdminNav() {

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
	  const { user } = useSelector((state) => state.auth);
	  const [slidder, setSlidder] = useState(-200);

  return (
	<div className="py-1 md:py-4 px-4 md:px-8 flex justify-between w-full shadow-md items-center relative ">
			<button
			  onClick={() => setSlidder(slidder === -200 ? 0 : -200)}
			  className="md:hidden inline-block hover:scale-95 transition-all duration-200 cursor-pointer font-bold outline-none"
			>
			  <i className="ri-menu-2-line text-lg outline-none "></i>
			</button>
	
			<p className="font-bold text-[var(--primary-color)]  md:text-lg">
			  Intellivue
			</p>
			<p className="font-semibold md:text-lg text-sm md:block hidden">
			  Dashboard
			</p>
			<div className=" ">
			  <img
				src={user?.avtar}
				alt="pp"
				className="rounded-full w-10 h-10 bg-gray-400"
			  />
			</div>
	
			{/* mobile view */}
			<div
			  className="md:hidden w-[200px] h-fit overflow-hidden  bg-gray-100 absolute top-12 flex flex-col gap-3 py-4 px-2 transition-all duration-200 rounded-tr-md rounded-br-md"
			  style={{
				left: `${slidder}px`,
			  }}
			>
			  {adminMenu?.map((item, index) => (
				<Link
				  key={index}
				  to={item.href}
				  className="font-semibold  py-1  hover:bg-[var(--secondary-color)] rounded-md transition-all duration-200 hover:text-white pl-8"
				>
				  <i className={`${item.icon} mr-2`}></i>
	
				  {item.title}
				</Link>
			  ))}
			</div>
		  </div>
  )
}

export default AdminNav
