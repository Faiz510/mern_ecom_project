import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-[50vh] flex justify-center items-center w-full">
      <InfinitySpin width="250" color="#fac423" />
    </div>
  );
};

export default Loader;
