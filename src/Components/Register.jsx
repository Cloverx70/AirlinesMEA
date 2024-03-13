import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const Register = () => {
  const {
    RUserObj,
    setRUserObj,
    PasswordInvalid,
    setPasswordInvalid,
    Error,
    setError,
    setPasswordError,
    LastN,
    setLastN,
    FirstN,
    setFirstN,
    RegisterWindow,
    setRegisterWindow,
    fetchRegister,
    setLoginWindow,
  } = useContext(AuthContext);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  const handleOnChangeEmail = (event) => {
    setRUserObj({ ...RUserObj, email: event.target.value });
  };
  const handleOnChangePassword = (event) => {
    setRUserObj({ ...RUserObj, password: event.target.value });
  };
  const handleOnChangeFirstN = (event) => {
    setRUserObj({ ...RUserObj, Firstname: event.target.value });
  };
  const handleOnChangeLastN = (event) => {
    setRUserObj({ ...RUserObj, Lastname: event.target.value });
  };

  const handleOnClickRegister = () => {
    const charactersToCheckRegex = /[@.\-]/;
    if (charactersToCheckRegex.test(RUserObj.firstName)) {
      setFirstN(true);
    } else if (charactersToCheckRegex.test(RUserObj.lastName)) {
      setLastN(true);
    } else if (
      !RUserObj.email.includes(".com") ||
      !RUserObj.email.includes("@")
    ) {
      setError(true);
    } else if (RUserObj.password.length < 8) {
      setPasswordInvalid(true);
    } else {
      fetchRegister();
    }
  };

  return (
    RegisterWindow && (
      <section
        onClick={() => {
          setError(false);
          setPasswordInvalid(false);
          setFirstN(false);
          setLastN(false);
          setPasswordError(false);
          setRegisterWindow(false);
        }}
        className="bg-black/50 w-full h-[2057px] absolute z-[110]"
      >
        <div
          className="w-[700px] h-[550px] gap-10 p-7 flex flex-col items-center justify-center absolute left-[330px] top-[150px] rounded-3xl bg-white"
          onClick={handleClick} // Add onClick event handler to the inner div
        >
          <h1 className="text-[30px] text-center font-medium">
            Hassle-free travel!
            <span className="text-red-800"> Sign up </span>today.
          </h1>
          <div className="flex gap-[100px] ">
            <div className="flex flex-col">
              <label className="pl-2 text-base" htmlFor="">
                First Name
              </label>
              <input
                className="border pl-2.5 rounded-md shadow-black/10 shadow-lg w-36 h-8"
                type="text"
                onChange={handleOnChangeFirstN}
              />
              {FirstN && (
                <p className="text-xs pt-3 font-semibold text-red-800">
                  Names cannot contain special characters...
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="pl-2 text-base" htmlFor="">
                Last Name
              </label>
              <input
                className="border pl-2.5 rounded-md shadow-black/10 shadow-lg  w-36 h-8"
                type="text"
                onChange={handleOnChangeLastN}
              />
              {LastN && (
                <p className="text-xs pt-3 font-semibold text-red-800">
                  Names cannot contain special characters...
                </p>
              )}
            </div>
          </div>
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
            {PasswordInvalid && (
              <p className="text-xs pt-3 font-semibold z-20 text-red-800">
                Your password should be at least 8-characters.
              </p>
            )}

            <p
              onClick={() => {
                setRegisterWindow(false);
                setLoginWindow(true);
              }}
              className="text-xs cursor-pointer pt-5 font-semibold z-20 text-red-800"
            >
              Already a member? Log in now...
            </p>
          </div>

          <button
            onClick={handleOnClickRegister}
            className="w-32 h-10 rounded-3xl bg-red-800 transition-all delay-100 ease-in-out text-white hover:bg-transparent hover:border border-black hover:text-black font-medium text-base"
          >
            Register
          </button>
        </div>
      </section>
    )
  );
};

export default Register;
