import React from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="w-full flex items-center justify-center h-32 bg-red-800">
      <div className=" text-center flex flex-col gap-3 justify-center items-center text-custom-body">
        <p className="text-sm text-white">Tell your friends about us</p>
        <div className=" flex gap-3">
          <FaFacebook size={25} />
          <RiInstagramFill size={25} />
          <FaTiktok size={25} />
          <FaXTwitter size={25} />
        </div>{" "}
        <p>MEA Airlines, All rights reserved</p>
      </div>
    </section>
  );
};

export default Footer;
