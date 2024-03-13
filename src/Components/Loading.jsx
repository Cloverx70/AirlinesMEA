import React from "react";

const Loading = () => {
  return (
    <div class="flex justify-center absolute items-center h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-800"></div>
    </div>
  );
};

export default Loading;
