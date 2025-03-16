import React, { useEffect, useState } from "react";

function Footer() {
  // const [isTop,setIsTop]=useState(false);

  // useEffect(()=>{

  // const toggleVisibility=()=>{
  // 	if(window.scrollY>300){
  // 		setIsTop(true);
  // 	}
  // 	else{
  // 		setIsTop(false);
  // 	}
  // }

  // window.addEventListener("scroll",toggleVisibility);
  // return ()=> window.removeEventListener("scroll",toggleVisibility);
  // },[])

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[var(--secondary-color)] w-full flex flex-col justify-center items-center pt-8 pb-15 gap-6 ">
      <div>
        <button
          onClick={backToTop}
          className="font-bold text-yellow-500 shadow-sm hover:scale-90 transition-all duration-200 cursor-pointer shadow-yellow-600 text-lg rounded-full py-1 px-4"
        >
          {" "}
          <i className="ri-arrow-up-line mr-2"></i>Back to top
        </button>
      </div>
      <div className="flex flex-col px-4 gap-2 font-bold md:text-lg text-sm justify-center items-center text-white text-center">
        <p>
          Register Address LNCT University, Raisen Rd, nr. Hanuman Mandir,
          Kalchuri Nagar, Bhopal, Madhya Pradesh 462022
        </p>
        <p className="text-gray-300">&copy; 2025 All right Reserved to : Md Afjal Hussain</p>

        <div className="flex flex-col gap-2 md:flex-row md:gap-4 font-semibold text-sm ">
          <p className="hover:text-yellow-500 transition-all cursor-pointer  ">
            Privacy & Terms of Use
          </p>
          <p className="hover:text-yellow-500 transition-all cursor-pointer ">
            About Intellivue
          </p>
          <p className="hover:text-yellow-500 transition-all cursor-pointer ">
            Editorial Policy
          </p>
          <p className="hover:text-yellow-500 transition-all  cursor-pointer ">
            Customer Support
          </p>
        </div>

        <div className="space-x-4 mt-4">
          <i className="ri-twitter-fill border rounded-full   cursor-pointer hover:text-yellow-500 transition-all duration-300 inline-block hover:scale-90 px-2 py-1"></i>
          <i className="ri-linkedin-box-fill border rounded-full  cursor-pointer hover:text-yellow-500 transition-all duration-300 inline-block hover:scale-90 px-2 py-1"></i>
          <i className="ri-facebook-circle-fill border rounded-full  cursor-pointer hover:text-yellow-500 transition-all duration-300 inline-block hover:scale-90 px-2 py-1"></i>
          <i className="ri-github-fill border rounded-full  cursor-pointer hover:text-yellow-500 transition-all duration-300 inline-block hover:scale-90 px-2 py-1"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
