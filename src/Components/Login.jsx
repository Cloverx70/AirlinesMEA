import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import Loading from "./Loading";

const Login = () => {
  const {
    LoginWindow,
    setLoginWindow,
    UserObj,
    setUserObj,
    fetchLogin,
    Error,
    setError,
    PasswordError,
    setPasswordError,
    RegisterWindow,
    setRegisterWindow,
    isLoading,
    setisLoading,
  } = useContext(AuthContext);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  const handleOnChangeEmail = (event) => {
    setUserObj({ ...UserObj, email: event.target.value });
    console.log(UserObj);
  };
  const handleOnChangePassword = (event) => {
    setUserObj({ ...UserObj, password: event.target.value });
    console.log(UserObj);
  };

  const handleOnClickLogin = () => {
    if (!UserObj.email.includes(".com") || !UserObj.email.includes("@")) {
      setError(true);
    }
    fetchLogin();
  };

  return (
    LoginWindow && (
      <section
        onClick={() => {
          setError(false);
          setPasswordError(false);
          setLoginWindow(false);
        }}
        className="bg-black/50 w-full h-[2057px] absolute z-[110]"
      >
        <div
          className="w-[500px] h-[500px] p-9 flex flex-col items-center justify-center gap-5 absolute left-[425px] top-[150px] rounded-3xl bg-white"
          onClick={handleClick} // Add onClick event handler to the inner div
        >
          {isLoading && <Loading />}
          <h1 className="text-[30px] text-center font-medium">
            READY FOR TAKE-OFF??{" "}
            <span className="text-red-800"> LOGIN NOW! </span>
          </h1>
          <div className="flex flex-col">
            <label className="pl-2 text-base" htmlFor="">
              Email
            </label>
            <input
              className="border pl-2.5 rounded-md shadow-black/10 shadow-lg w-96 h-8"
              type="email"
              onChange={handleOnChangeEmail}
            />
            {Error && (
              <p className="text-xs pt-3 font-semibold text-red-800">
                Invalid email format...
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="pl-2 text-base " htmlFor="">
              Password
            </label>
            <input
              className="border pl-2.5 rounded-md shadow-lg shadow-black/10 w-96 h-8"
              type="Password"
              onChange={handleOnChangePassword}
            />
            {PasswordError && (
              <p className="text-xs pt-3 font-semibold z-20 text-red-800">
                Invalid Credentials
              </p>
            )}
            <p
              onClick={() => {
                setLoginWindow(false);
                setRegisterWindow(true);
              }}
              className="text-xs pt-5 cursor-pointer font-semibold z-20 text-red-800"
            >
              New? Click me to Register..
            </p>
          </div>

          <button
            onClick={handleOnClickLogin}
            className="w-32 h-10 rounded-3xl bg-red-800 transition-all delay-100 ease-in-out text-white hover:bg-transparent hover:border border-black hover:text-black font-medium text-base"
          >
            Login
          </button>
        </div>
      </section>
    )
  );
};

export default Login;
