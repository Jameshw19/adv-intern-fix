import React from "react";

const Spinner = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-t-[transparent] animate-spin"></div>
  </div>
);

export default Spinner;
