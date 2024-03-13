import React from "react";

const ContactUs = () => {
  return (
    <section className="w-full h-96 flex  items-start justify-center">
      <div className="flex flex-col gap-3 w-[500px] h-auto">
        <p className="text-3xl text-center text-white">
          Contact
          <span className="text-red-800"> Us</span> <br />
          <span className="text-sm text-center text-white">
            {" "}
            If you're encountering any problem please let us know
          </span>
        </p>

        <div className="flex flex-col gap-0.5 ">
          <label className=" text-white" htmlFor="">
            Contact Email
          </label>
          <input
            className=" bg-custom-input pl-2 rounded-lg w-64 h-10 text-Custom-Nav"
            type="email"
            placeholder="example123@gmail.com"
          />
        </div>
        <div className="flex flex-col  w-full h-auto gap-0.5">
          <label className=" text-white" htmlFor="">
            Message
          </label>

          <textarea
            placeholder="Type your message here..."
            className=" bg-custom-input pt-2 pl-2 rounded-lg  text-Custom-Nav"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="flex">
          <button className="w-32 h-10 rounded-lg bg-custom-input hover:bg-red-800 transition-all delay-100 ease-in-out text-white">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
