import React from "react";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
const ProfilePhoto = () => {
  const { UserInfo } = useContext(AuthContext);

  function getFirstLetter(name) {
    if (typeof name !== "string" || name.length === 0) {
      return null;
    }

    return name.charAt(0);
  }
  return (
    <section>
      <div className="rounded-full bg-custom-input w-20 h-20 flex justify-center items-center">
        <p className="text-3xl uppercase text-white">
          {getFirstLetter(UserInfo.username)}
        </p>
      </div>
    </section>
  );
};

export default ProfilePhoto;
