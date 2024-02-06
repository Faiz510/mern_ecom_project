import { FaRegCopyright } from "react-icons/fa";

const CopyrightRow = () => {
  return (
    <div className="flex justify-center items-center border-t-[1px] border-white w-full text-center py-4">
      <p className="flex items-center justify-center gap-2 mx-auto text-[1rem] font-thin opacity-80">
        Copyright
        <span>
          <FaRegCopyright />
        </span>
        faizyabKhalid . All Rights Reserved
      </p>
    </div>
  );
};

export default CopyrightRow;
