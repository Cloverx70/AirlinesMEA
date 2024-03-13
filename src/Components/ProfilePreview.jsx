import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const ProfilePreview = () => {
  const {
    UserInfo,
    setEditProfileClick,
    EditProfileClick,
    fetchUpdateFullUserById,
    userFlights,
    setuserFlights,
    fetchUpdateProfile,
    fetchRemoveFlightByFlightId,
  } = useContext(AuthContext);
  const FullName =
    UserInfo && UserInfo.username ? UserInfo.username.split(" ") : ["", ""];

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate("/");
  }
  useEffect(() => {
    if (UserInfo) {
      const fullName = UserInfo.username
        ? UserInfo.username.split(" ")
        : ["", ""];
      setFirst(fullName[0] || "");
      setSecond(fullName[1] || "");
      setEmail(UserInfo.email || "");
    }
  }, [UserInfo]);

  const handleFirstChange = (e) => {
    setFirst(e.target.value);
  };

  const handleSecondChange = (e) => {
    setSecond(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  function CreateToast(Message) {
    toast((t) => {
      return <span className="">{Message}</span>;
    });

    return null;
  }

  return (
    <section className="w-full  min-h-screen flex flex-col p-3 ">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className=" bg-custom-dashboard rounded-2xl  w-[1250px] h-auto flex flex-col gap-x-20 p-3">
          <p className=" text-xl pb-10 text-white ">Passenger Profile : </p>
          <div className="flex justify-start items-center gap-x-20">
            <div className="flex flex-col ">
              <ProfilePhoto />
            </div>

            <div className="flex flex-col  text-white ">
              <label className="pl-1" htmlFor="">
                First Name
              </label>
              <input
                type="text"
                className=" bg-custom-input pl-2 cursor-default rounded-lg w-64 h-10 text-Custom-Nav"
                value={FullName[0]}
                readOnly
              />
            </div>

            <div className="flex flex-col  text-white ">
              <label htmlFor="" className="pl-1">
                Last Name
              </label>
              <input
                type="text"
                className=" bg-custom-input pl-2 cursor-default rounded-lg  w-64 h-10 text-Custom-Nav"
                value={FullName[1]}
                readOnly
              />
            </div>

            <div className="flex flex-col  text-white ">
              <label htmlFor="" className="pl-1">
                Email
              </label>
              <input
                type="email"
                className=" bg-custom-input pl-2 cursor-default  rounded-lg w-64 h-10 text-Custom-Nav"
                value={UserInfo.email}
                readOnly
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => setEditProfileClick(true)}
              className="ml-[1095px] w-32 h-10 mt-6 rounded-md hover:bg-custom-input hover:text-white transition-all delay-100 ease-in-out bg-white text-custom-input z-20"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {EditProfileClick && (
          <div className=" bg-custom-dashboard rounded-2xl w-[1250px] h-auto flex p-7 gap-10 justify-center ">
            <div className="text-white flex flex-col">
              <label className="pl-1" htmlFor="">
                First Name
              </label>
              <input
                type="text"
                className=" bg-custom-input pl-2 rounded-lg w-64 h-10 text-Custom-Nav"
                value={first}
                onChange={handleFirstChange}
              />
            </div>
            <div className="text-white flex flex-col">
              <label htmlFor="" className="pl-1">
                Last Name
              </label>
              <input
                type="text"
                className=" bg-custom-input pl-2 rounded-lg  w-64 h-10 text-Custom-Nav"
                value={second}
                onChange={handleSecondChange}
              />
            </div>
            <div className="text-white flex flex-col">
              <label htmlFor="" className="pl-1">
                Email
              </label>
              <input
                type="email"
                className=" bg-custom-input pl-2 rounded-lg w-64 h-10 text-Custom-Nav"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={async () => {
                  await fetchUpdateFullUserById(first, second, email);
                  setTimeout(() => {
                    navigate(0);
                  }, 3000);
                }}
                className="w-32 h-10 ml-44 bg-custom-body rounded-lg text-white hover:bg-white hover:text-custom-body transition-all delay-100 ease-in-out"
              >
                Save
              </button>
              <button
                className="w-32 h-10 mt-6 ml-44 bg-custom-body rounded-lg text-white hover:bg-white hover:text-custom-body transition-all delay-100 ease-in-out"
                onClick={() => setEditProfileClick(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="w-[1250px] h-auto flex flex-col gap-5 p-6 rounded-2xl bg-custom-dashboard">
          {userFlights.length !== 0 ? (
            <>
              <p className="text-xl text-white">
                {userFlights.length} Booked Flights :
              </p>
              {userFlights.map((item) => {
                return (
                  <div
                    className="h-24 w-full pr-4 pl-4 gap-48 bg-custom-input text-white rounded-2xl flex justify-start"
                    key={item.flightId}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-sm">Departing From:</p>
                      <p className="font-bold text-xl">{item.departingfrom}</p>
                    </div>
                    <div className="flex flex-col w-40 h-auto justify-center items-center">
                      <p className="font-semibold">{item.flightType}</p>
                      <p className="text-Custom-Nav text-sm">
                        {new Date(item.departingDate).toLocaleDateString()}
                      </p>
                      <p>{item.roundTrip}</p>
                    </div>
                    <div className="flex flex-col w-20 justify-center items-center">
                      <p className="text-sm">Arriving At:</p>
                      <p className="font-bold text-xl">{item.arrivingat}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p>${item.bookedtickets}</p>
                      <button
                        onClick={async () => {
                          await fetchRemoveFlightByFlightId(
                            item.userflightId,
                            item.bookedtickets,
                            item.tickets
                          );
                          navigate(0);
                        }}
                        className="w-40 h-9 rounded-xl border-none hover:bg-custom-body hover:text-Custom-Nav transition-all delay-100 ease-in-out bg-white text-black"
                      >
                        Cancel Flight
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 ">
              <p className="text-center text-white text-xl font-medium">
                You haven't booked any flights yet...
              </p>
              <a
                className="rounded-lg  text-Custom-Nav cursor-pointer underline text-sm hover:text-custom-body transition-all delay-100 ease-in-out "
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Book Now
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePreview;
