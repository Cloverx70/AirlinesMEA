import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineLocationCity } from "react-icons/md";
const Destinations = () => {
  const { Flights, setBookClick, fetchFlightById, Locations } =
    useContext(AuthContext);
  const [arrival, setarrival] = useState("");
  const [budget, setbudget] = useState(0);
  const navigate = useNavigate();

  const filteredflights = () => {
    const filteredBudget = () => {
      return Flights.filter((item) => {
        return item.price <= budget;
      });
    };

    const filteredArrival = () => {
      return Flights.filter((item) => {
        return item.arrivalLocation === arrival;
      });
    };

    if (arrival !== "" && budget > 0) {
      return Flights.filter(
        (item) => item.arrivalLocation === arrival && item.price <= budget
      );
    } else if (arrival !== "") {
      return filteredArrival();
    } else if (budget > 0) {
      return filteredBudget();
    } else {
      return Flights;
    }
  };

  return (
    <section className="h-min-screen w-full pt-10 ">
      <div className="flex flex-col items center justify-center">
        <div className="flex flex-col text-white items gap-5 p-10 bg-custom-dashboard center items-center justify-center">
          <p className=" text-xl">
            Top <span className="text-red-800 text-2xl"> Destinations</span>
          </p>
          <div className="flex gap-5 ">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Departing from: </label>
              <input
                readOnly
                className=" bg-custom-input pl-2  rounded-lg w-42 h-10 text-Custom-Nav"
                type="text"
                value="Bierut"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Arriving At:</label>
              <select
                onChange={(e) => {
                  setarrival(e.target.value);
                }}
                className=" bg-custom-input pl-2  rounded-lg w-52 h-10 text-Custom-Nav"
                type="text"
              >
                <option value="">Choose...</option>
                {Locations.map((item) => {
                  return (
                    <option key={item.locationId} value={item.locationName}>
                      {item.locationName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Maximum Budget: </label>
              <input
                onClick={(e) => {
                  setbudget(e.target.value);
                }}
                className=" bg-custom-input pl-2  rounded-lg w-42 h-10 text-Custom-Nav"
                type="number"
              />
            </div>
          </div>
        </div>

        <hr className=" border-white/15 mt-10" />
        <div className="w-full h-52 flex items-center  justify-between pl-6 pr-6 ">
          <div
            onClick={() => navigate("/destinations/asia")}
            className=" h-40 w-72 relative cursor-pointer hover:scale-110 transition-all delay-100 ease"
          >
            <p className="absolute z-[100] top-[70px] cursor-pointer left-24 text-4xl text-white">
              Asia
            </p>
            <img
              className="absolute inset-0 rounded-2xl brightness-75 w-full h-full object-cover"
              src="https://wallpapercosmos.com/w/full/2/2/b/1451526-3840x2160-desktop-4k-asia-wallpaper-photo.jpg"
              alt=""
            />
          </div>

          <div
            onClick={() => navigate("/destinations/africa")}
            className=" h-40 w-72 relative hover:scale-110 cursor-pointer transition-all delay-100 ease-in-out"
          >
            <p className="absolute z-[100] top-[70px] left-[94px]  cursor-pointer text-4xl text-white">
              Africa
            </p>
            <img
              className="absolute object-center rounded-2xl inset-0 brightness-75 w-full h-full object-cover"
              src="https://cdn.wallpapersafari.com/90/11/Asc24x.jpg"
              alt=""
            />
          </div>

          <div
            onClick={() => navigate("/destinations/europe")}
            className=" h-40 w-72 relative cursor-pointer hover:scale-110 transition-all delay-100 ease-in-out"
          >
            <p className="absolute z-[100] top-[70px] cursor-pointer left-20 text-4xl text-white">
              Europe
            </p>
            <img
              className="absolute inset-0 rounded-2xl brightness-75 w-full h-full object-cover"
              src="https://e0.pxfuel.com/wallpapers/965/268/desktop-wallpaper-europe-nature-european-scenery.jpg"
              alt=""
            />
          </div>

          <div
            onClick={() => navigate("/destinations/america")}
            className=" h-40 w-72 relative cursor-pointer hover:scale-110 transition-all delay-100 ease-in-out"
          >
            <p className="absolute z-[100] top-[70px] cursor-pointer left-[73px] text-4xl text-white">
              America
            </p>
            <img
              className="absolute inset-0 rounded-2xl brightness-75 w-full h-full object-cover"
              src="https://i.pinimg.com/736x/a2/17/77/a21777ac84202efba7804396b6a4199e.jpg"
              alt=""
            />
          </div>
        </div>
        <hr className=" border-white/15" />
        <p className="text-center pt-5 text-2xl text-white">
          Available <span className="text-red-800 text-2xl"> Flights : </span>
        </p>
        <p className="text-sm pb-5 pl-5 pr-5 text-center text-white">
          Here's a small list about the current upcoming flights
        </p>
        <div className="w-full h-auto grid justify-items-center grid-cols-4 gap-y-10  ">
          {filteredflights().map((item) => {
            return (
              <div
                onClick={() => {
                  sessionStorage.setItem("flightid", item.flightId);
                  fetchFlightById();
                  setBookClick(true);
                }}
                className="w-72 h-72  relative rounded-3xl cursor-pointer hover:scale-105 transition-all delay-100 ease-in-out"
                key={item.id}
              >
                <p className="absolute bottom-8 left-7 z-50 cursor-pointer text-white text-sm ">
                  <span className="text-xl font-medium"> Arriving at: </span>
                  <br /> {item.arrivalLocation} ({item.continent})
                </p>
                <p className="absolute cursor-pointer top-5 left-4 z-50 flex flex-col items-center text-white text-sm ">
                  {item.roundTrip}
                  <br />

                  {item.roundTrip === "One way" ? (
                    <GoArrowSwitch size={20} />
                  ) : (
                    <MdOutlineLocationCity size={20} />
                  )}
                </p>
                <p className="absolute top-4 right-4 z-50 cursor-pointer text-white font-semibold ">
                  <span className="text-sm font-normal">From</span> USD{" "}
                  {item.price}
                </p>
                <img
                  className="absolute inset-0 w-full brightness-75 h-full object-cover rounded-3xl"
                  style={{ objectFit: "cover" }}
                  src={item.imgsrc}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
