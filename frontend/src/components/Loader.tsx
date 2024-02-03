import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-[50vh] flex justify-center items-center w-full">
      <InfinitySpin
        visible={true}
        width="200"
        color="#fac423"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
