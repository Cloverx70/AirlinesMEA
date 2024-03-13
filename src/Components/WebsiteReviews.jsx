import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { FaStar } from "react-icons/fa";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const WebsiteReviews = () => {
  const { Reviews, fetchAddReview, CreateToast } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [textArea, settextArea] = useState("");

  const navigate = useNavigate();

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  const renderStarRating = (stars) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={20}
        onClick={() => handleStarClick(index)}
        color={index < stars ? "yellow" : "white"}
      />
    ));
  };

  const handleOnClickSubmit = async () => {
    if (localStorage.getItem("isLoggedIn")) {
      await fetchAddReview(textArea, rating);
      navigate(0);
    } else {
      CreateToast("You need to be logged in to use this feature");
    }
  };

  return (
    <section className="w-full h-[400px] pt-14 border-t-2 border-white/60">
      <p className="text-4xl text-white text-center">
        Top <span className="text-red-800">Reviews</span>
      </p>
      <p className="text-white text-sm font-light text-center pb-3">
        These are some of our top reviews
      </p>{" "}
      <div className="flex justify-center p-5 gap-5">
        {Reviews.map((item) => (
          <div
            className="w-72 h-[150px] rounded-tl-[50px] rounded-br-[50px] rounded-2xl flex flex-col gap-5 items-center p-5 justify-center shadow-xl bg-custom-dashboard"
            key={item.id}
          >
            <h1 className="text-white font-light">
              {item.username.toUpperCase()}
            </h1>
            <p className="font-medium text-white text-center text-base">
              {item.userMessage}
            </p>
            <div className="flex">{renderStarRating(item.stars)}</div>
          </div>
        ))}
      </div>
      <hr className="border-white/15" />
      <div className="flex flex-col gap-2 items-center justify-center w-full h-82 p-10">
        <div className="text-center">
          <p className="text-4xl text-white">
            Leave a <span className="text-red-800">review</span>
          </p>
          <p className="text-white text-sm font-light text-center pb-3">
            Make sure to leave an honest response about how you think about our
            website!
          </p>
        </div>
        <div className="flex gap-4 flex-col items-center justify-center">
          <textarea
            onChange={(e) => {
              settextArea(e.target.value);
            }}
            placeholder="Type your message here.."
            className="pl-3 pt-3 rounded-bl-3xl rounded-tr-3xl bg-custom-dashboard text-white"
            name=""
            id=""
            cols="100"
            rows="10"
          ></textarea>
          <div className="flex gap-2 text-white items-center justify-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={20}
                className="cursor-pointer"
                onClick={() => handleStarClick(index)}
                color={index < rating ? "yellow" : "white"} // Change color based on the rating
              />
            ))}
          </div>
          <button
            onClick={handleOnClickSubmit}
            className="w-36 h-11 bg-custom-input text-white rounded-lg hover:bg-red-800 hover:text-white transition-all delay-100 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default WebsiteReviews;
