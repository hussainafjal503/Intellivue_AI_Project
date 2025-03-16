import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const {  isAuthenticated } = useSelector((state) => state.auth);
  
  const menu = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Profile",
      href: "/profile",
    },
    {
      title: "Contact-us",
      href: "/contact-us",
    },
  ];
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(-220);

  const menuHandler = () => {
    setShowMenu(showMenu === 0 ? -220 : 0);
  };

  if (!isAuthenticated) {
    menu.splice(2, 1);
  }
  useEffect(() => {
    // console.log(isAuthenticated );  
  }, [isAuthenticated]);

  return (
    <div className="z-40 fixed top-0 w-full shadow-md shadow-black py-4 bg-[var(--primary-color)] text-white ">
      <nav className="  flex flex-row justify-between font-semibold">
        <div className="pl-6">
          <h1>Intellivue</h1>
        </div>
        <div className=" sm:flex flex-row gap-4 hidden pr-6">
          {menu?.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.href}
                className={`hover:text-yellow-500 transition-all duration-200 ${
                  location.pathname === item.href && "text-yellow-500"
                } py-4`}
              >
                {item.title}
              </NavLink>
            </div>
          ))}

          {!isAuthenticated && (
            <div className="flex gap-2">
              <button className="transition-all duration-300  hover:scale-90">
                <NavLink
                  to={"/login"}
                  className={`cursor-pointer bg-[var(--btn-color1)] rounded-md py-2 px-4 shadow-sm text-black font-bold hover:bg-white 		`}
                >
                  LogIn
                </NavLink>
              </button>
              <button className="transition-all duration-300  hover:scale-90">
                <NavLink
                  to={"/signup"}
                  className={`cursor-pointer bg-[var(--secondary-color)] rounded-md py-2 px-4 shadow-sm text-white font-bold hover:bg-yellow-600 		`}
                >
                  SignUp
                </NavLink>
              </button>
            </div>
          )}
        </div>

        <div className="sm:hidden relative">
          <button
            className="hover:scale-90 transition-all duration-300 cursor-pointer text-xl p-0 "
            onClick={menuHandler}
          >
            <i className="ri-menu-fill mr-6"></i>
          </button>

          <div
            className={` absolute w-[220px] bg-[var(--primary-color)] py-4 px-2 top-11 flex flex-col gap-6 items-center pb-8 rounded-bl-md overflow-hidden transition-all duration-300`}
            style={{
              right: `${showMenu}px`,
            }}
          >
            {menu?.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.href}
                  className={`hover:text-yellow-500 transition-all duration-200 ${
                    location.pathname === item.href && "text-yellow-500"
                  } py-4`}
                >
                  {item.title}
                </NavLink>
              </div>
            ))}

            {!isAuthenticated && (
              <div className="flex flex-col gap-6">
                <button className="transition-all duration-300  hover:scale-90">
                  <NavLink
                    to={"/login"}
                    className={`cursor-pointer bg-[var(--btn-color1)] rounded-md py-2 px-4 shadow-sm text-black font-bold hover:bg-white 		`}
                  >
                    LogIn
                  </NavLink>
                </button>
                <button className="transition-all duration-300  hover:scale-90">
                  <NavLink
                    to={"/signup"}
                    className={`cursor-pointer bg-[var(--secondary-color)] rounded-md py-2 px-4 shadow-sm text-white font-bold hover:bg-yellow-600 		`}
                  >
                    SignUp
                  </NavLink>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
