import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import "../Styles/Bookwindow.css";
const BookWindow = () => {
  const { BookClick, setBookClick, Flight, CreateToast } =
    useContext(AuthContext);

  async function fetchAddUserFlightAndUpdateUserById(
    ticketnb,
    uid,
    fid,
    fprice
  ) {
    const response = await fetch(
      "https://localhost:7256/api/UserFlights/add-user-flight",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tickets: ticketnb,
          uid: uid,
          fid: fid,
        }),
      }
    );

    const FlightData = await response.json();
    console.log(FlightData.data);

    const response2 = await fetch(
      "https://localhost:7256/api/Login/update-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: uid,
          flightsBookNumber: ticketnb,
          flightsDoneNumber: 0,
          flightsCanceledNumber: 0,
          flightPrice: fprice,
        }),
      }
    );
    const updateUseResponse = await response2.json();
    console.log(updateUseResponse.data);

    if (response.data !== null && response2.data !== null) {
      setTimeout(() => {
        navigate(0);
      }, 1200);

      return true;
    } else {
      return false;
    }
  }

  const [Count, setCount] = useState(0);
  const [Count2, setCount2] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (BookClick) {
      setTimeout(() => {
        refDiv.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [BookClick]);

  const handleOnCLickBook = async () => {
    try {
      const result = await fetchAddUserFlightAndUpdateUserById(
        Count,
        localStorage.getItem("id"),
        sessionStorage.getItem("flightid"),
        Flight.price * Count
      );
      console.log(result);
      if (result) {
        setBookClick(false);
        CreateToast("You successfully booked a flight");
      } else {
        setBookClick(false);
        CreateToast("There was an error. Please try again later.");
      }
    } catch (error) {}
  };

  const refDiv = useRef(null);

  return (
    <>
      {BookClick && (
        <section className="inset-0 z-[1000] fixed flex flex-col justify-center items-center bg-black/50 ">
          <div className=" w-[1300px]  h-76 rounded-2xl bg-custom-dashboard">
            <div className="w-full h-full flex flex-col items-start justify-center p-6 rounded-2xl gap-6 bg-custom-dashboard ">
              <div className=" h-[100px] w-full pr-4 pl-4   gap-60 bg-custom-input text-white rounded-2xl flex items-center pt-6 pb-6  justify-start">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm">Departing From:</p>
                  <p className="font-bold text-xl">
                    {Flight.depratureLocation}
                  </p>
                </div>
                <div className="flex flex-col w-40 h-auto justify-center items-center">
                  <p className="font-semibold">{Flight.flightType}</p>
                  <p className=" text-Custom-Nav text-sm">
                    {new Date(Flight.depratureDateTime).toLocaleDateString()}
                  </p>
                  <p>{Flight.roundTrip}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm">Arriving At:</p>
                  <p className="font-bold text-xl">{Flight.arrivalLocation}</p>
                  <p className="text-sm">{Flight.continent}</p>
                </div>
                <div className="flex flex-col items-center justify-center ">
                  <p>Price</p>
                  <p>${Flight.price}</p>
                </div>
              </div>
              <div></div>
              <div className="flex gap-7 items-start justify-center">
                <div className=" gap-5 flex ">
                  <div className="flex flex-col gap-1 relative">
                    <label
                      htmlFor=""
                      className="text-white text-base font-semibold"
                    >
                      Tickets
                    </label>
                    <input
                      className=" w-40 h-10  z-50 rounded-lg pl-2 cursor-default bg-custom-input text-white "
                      type="number"
                      value={Count}
                      readOnly
                    />
                    <p
                      onClick={() => setCount(Count + 1)}
                      className="absolute top-9 right-10 cursor-pointer text-white text-xl  z-[60]"
                    >
                      +
                    </p>
                    <p
                      onClick={() => {
                        if (Count <= 0) {
                          setCount(0);
                        } else {
                          setCount(Count - 1);
                        }
                      }}
                      className="absolute  top-9 right-4 cursor-pointer text-white text-xl  z-[60]"
                    >
                      -
                    </p>
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <label
                      htmlFor=""
                      className="text-white text-base font-semibold"
                    >
                      Children (if any)
                    </label>
                    <input
                      className=" w-40 h-10  rounded-lg pl-2  bg-custom-input text-white "
                      type="number"
                      value={Count2}
                    />
                    <p
                      onClick={() => setCount2(Count2 + 1)}
                      className="absolute top-8 right-10 cursor-pointer text-white text-xl  z-30"
                    >
                      +
                    </p>
                    <p
                      onClick={() => {
                        if (Count2 <= 0) {
                          setCount2(0);
                        } else {
                          setCount2(Count2 - 1);
                        }
                      }}
                      className="absolute top-8  cursor-pointer text-white text-2xl right-4 z-30"
                    >
                      -
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex gap-5 ">
                {" "}
                <button
                  onClick={() => {
                    sessionStorage.clear("flightid");
                    setBookClick(false);
                  }}
                  className=" w-32 h-10 rounded-2xl hover:bg-custom-input hover:text-white transition-all delay-100 ease-in-out bg-white text-custom-input z-20"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (localStorage.getItem("isLoggedIn")) {
                      handleOnCLickBook();
                    } else {
                      setBookClick(false);
                      CreateToast(
                        "You need to be logged in to use this feature"
                      );
                    }
                  }}
                  className=" w-32 h-10 rounded-2xl hover:bg-custom-input hover:text-white transition-all delay-100 ease-in-out bg-white text-custom-input z-20"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default BookWindow;
