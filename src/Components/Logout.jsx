import React from "react";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import Loading from "./Loading";
const Logout = () => {
  const {
    LogoutWindow,
    setLogoutWindow,
    setProfileWindow,
    isLoading,
    setisLoading,
    CreateToast,
  } = useContext(AuthContext);

  const handleOnClickLogout = () => {
    setisLoading(true);
    localStorage.clear("token");
    localStorage.clear("isLoggedIn");
    setLogoutWindow(false);
    setProfileWindow(false);
    setisLoading(false);
    CreateToast("You logged out successfully");
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  return (
    LogoutWindow && (
      <section
        onClick={() => setLogoutWindow(false)}
        className="bg-black/50 w-fullh-[2057px] absolute z-[110] flex"
      >
        <div
          className="w-[500px] h-[220px] p-9 flex flex-col items-center justify-center gap-5 absolute left-[425px] top-[150px] rounded-3xl bg-white"
          onClick={handleClick} // Add onClick event handler to the inner div
        >
          <h1 className="text-3xl text-center font-medium">
            ARE YOU SURE YOU WANNA
            <span className="text-red-800"> LOGOUT?! </span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setProfileWindow(false);
                setLogoutWindow(false);
              }}
              className="w-32 h-9 rounded-3xl bg-red-800 transition-all delay-100 ease-in-out text-white hover:bg-transparent hover:border border-black hover:text-black font-mediuns text-base"
            >
              Back
            </button>
            <button
              onClick={() => {
                handleOnClickLogout();
              }}
              className="w-32 h-9 rounded-3xl bg-red-800 transition-all delay-100 ease-in-out text-white hover:bg-transparent hover:border border-black hover:text-black font-mediuns text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    )
  );
};
export default Logout;
