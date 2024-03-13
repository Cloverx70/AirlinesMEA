import React from "react";
import attendantsimg from "../Assets/Attendants.png";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const { Locations, CreateToast } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <section className="z-1">
      <div className="w-full relative h-[571px] flex ">
        <div className="absolute bottom-9 flex right-0  items-center justify-start gap-10 w-[1000px] h-[120px] bg-Custom-HeroO z-20 ">
          <div className="ml-5">
            <h1 className=" text-white font-medium text-3xl">Lets Fly!</h1>
            <p className=" text-Custom-Nav font-light">
              we'll handle everything for you, please <br /> choose from the
              following.
            </p>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col">
              <label className="text-white mt-0.5 text-lg" htmlFor="">
                Where to?
              </label>{" "}
              <select
                className="w-[130px] h-[30px] rounded-sm bg-transparent text-Custom-Nav "
                name=""
                id=""
              >
                <option value="">Choose..</option>

                {Locations.map((item) => {
                  return (
                    <option key={item.locationId} value={item.locationName}>
                      {item.locationName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-white mt-0.5 text-lg" htmlFor="">
                Round Trip
              </label>{" "}
              <select
                className="w-[130px] h-[30px] rounded-sm bg-transparent text-Custom-Nav "
                name=""
                id=""
              >
                <option value="">Choose..</option>
                <option value="One way">One way</option>
                <option value="Multicity">Multicity</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-white text-lg" htmlFor="">
                Departing date
              </label>{" "}
              <input
                className="w-[130px] h-[30px] ml-1 text-sm rounded-sm bg-transparent  text-Custom-Nav "
                type="date"
              />
            </div>
            <div>
              <button
                onClick={() => {
                  if (localStorage.getItem("isLoggedIn")) {
                    navigate("/dashboard");
                  } else {
                    CreateToast("You need to be logged in to use this feature");
                  }
                }}
                className="w-32 h-10 mt-2 ml-5  hover:bg-custom-body hover:text-white transition-all delay-100 ease-in-out bg-white text-Custom-HeroO  rounded-2xl"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className=" absolute top-32 left-10  text-white font-light text-5xl ">
          <h1>
            Are you ready to <br />{" "}
            <span className="text-red-800"> take off?</span>
          </h1>
          <p className="text-lg font">
            From runway to skyway, embark on a journey of endless <br />{" "}
            possibilities. Let your wanderlustguide you with us.
          </p>
        </div>

        <div className="w-full h-[600px] ml-[490px] z-10">
          <img
            className="  w-full h-full object-top contrast-125 object-cover"
            src={attendantsimg}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
