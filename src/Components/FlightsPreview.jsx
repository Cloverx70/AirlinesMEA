import React from "react";
import { useContext, useState, useRef } from "react";
import AuthContext from "../Contexts/AuthContext";
const FlightsPreview = () => {
  const { Flights, setBookClick, fetchFlightById, CreateToast } =
    useContext(AuthContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setTimeout(() => {
      setShowButton(true);
    }, 130); // Adjust delay time as needed
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setShowButton(false);
  };

  const scrollToDiv = () => {
    setTimeout(() => {
      myDivRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };
  return (
    <section>
      <p className="text-4xl text-white text-center">
        Top<span className=" text-red-800"> Destinations</span>
      </p>
      <p className="text-white text-sm font-light text-center pb-5">
        Explore our top destinations for your next adventure!
      </p>
      {Flights.slice(0, 3).map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className="w-full border-t-2 border-white/60 hover:h-[300px] transition-all ease-in-out delay-100  relative h-[100px]"
        >
          <div>
            <p className="absolute top-5 left-2 text-white text-3xl font-medium z-10">
              {item.arrivalLocation}{" "}
              <span className=" text-[15px] "> ({item.continent})</span>
            </p>
          </div>
          <div className="absolute top-14 left-2 text-white text-xl font-extralight z-10">
            {item.roundTrip}
          </div>
          <div className="absolute flex flex-col items-center z-10 right-10 top-6 text-white font-medium">
            <p className="text-xl font-light">Ticket Price</p>
            <p className="text-xl">{item.price}.00 $USD</p>
          </div>
          {hoveredIndex === index && showButton && (
            <div>
              <button
                onClick={() => {
                  sessionStorage.setItem("flightid", item.flightId);
                  if (!localStorage.getItem("isLoggedIn")) {
                    CreateToast("You need to be logged in to use this feature");
                  } else {
                    fetchFlightById();
                    setBookClick(true);
                    scrollToDiv();
                  }
                }}
                className="absolute bottom-5 left-3 w-40 h-10 rounded-md hover:bg-red-800 transition-all delay-100 ease-in-out bg-Custom-HeroO text-white z-20"
              >
                Book Now!
              </button>
            </div>
          )}
          <img
            className="object-cover cursor-pointer blur-[1px] hover:blur-none   brightness-50 object-center w-full h-full z-0"
            src={item.imgsrc}
            alt=""
          />
        </div>
      ))}
    </section>
  );
};
export default FlightsPreview;
