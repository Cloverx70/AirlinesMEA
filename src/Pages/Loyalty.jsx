import React from "react";

const Loyalty = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-white pt-5">
        <span className="text-2xl">
          Welcome to Our{" "}
          <span className=" text-red-800"> Loyalty Program </span>
        </span>
      </p>
      <div className="flex flex-col gap-2 w-[600px] h-full justify-center items-center pr-10 pl-10 pb-10">
        <p className="text-white text-center ">
          <br />
          At MEA Airlines, we believe in rewarding our valued passengers for
          their loyalty. That's why we've created our exclusive Loyalty Program
          designed to enhance your travel experience and provide you with
          exciting benefits every time you fly with us. <br />
          <br />
          <strong className="text-red-800">
            Why Join Our Loyalty Program?
          </strong>{" "}
          <br />
          <strong>Earn Miles:</strong> With every flight you take with MEA
          Airlines, you'll earn miles that can be redeemed for free flights,
          upgrades, and more. <br />
          <strong>Exclusive Benefits:</strong> Enjoy priority check-in,
          boarding, and access to exclusive lounges at select airports. <br />
          <strong>Flexible Rewards:</strong> Use your miles to book flights,
          upgrade your seat, or even indulge in luxurious hotel stays and car
          rentals. <br />
          <strong>Member-Only Promotions:</strong> Gain access to special
          promotions, discounts, and offers available only to our loyalty
          program members. <br />
          <strong>Tier Status:</strong> Elevate your travel experience with our
          tiered membership levels, unlocking additional perks and privileges as
          you progress. <br />
          <br />
          <strong className="text-red-800">How It Works:</strong> <br />
          <strong>Sign Up:</strong> Joining our Loyalty Program is simple and
          free. Sign up online or through our mobile app to start earning miles
          immediately. <br />
          <strong>Earn Miles:</strong> Fly with MEA Airlines or our partner
          airlines to accumulate miles based on your travel distance and ticket
          fare class. <br />
          <strong>Redeem Rewards:</strong> Use your earned miles to book
          flights, upgrade your seat, or indulge in travel-related experiences.{" "}
          <br />
          <strong>Enjoy Benefits:</strong> As a member, you'll enjoy a range of
          exclusive benefits and privileges designed to enhance your travel
          experience with us. <br />
          <br />
          <strong className="text-red-800">
            Join Today and Start Earning!
          </strong>{" "}
          <br />
          Join our Loyalty Program today and embark on a journey filled with
          rewards, exclusive benefits, and unforgettable travel experiences.
          Whether you're a frequent flyer or an occasional traveler, our Loyalty
          Program is designed to make every journey with MEA Airlines more
          rewarding.
        </p>
        <button className="w-32 h-10 rounded-lg bg-custom-input text-white transition-all delay-100 ease-in-out hover:bg-red-800">
          Join now!
        </button>
      </div>
    </section>
  );
};

export default Loyalty;
