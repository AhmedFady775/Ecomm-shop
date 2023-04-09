import React from "react";
import { Store } from "../../redux/Store";
import { useContext } from "react";
import CustomerNav from "./CustomerNav";

function Returns() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:m-auto pt-[60px] lg:pt-4 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <CustomerNav />
        <div className="flex flex-col lg:w-[70%]  shadow lg:rounded bg-white h-fit">
          <p className="text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-[26px] px-6">
            Returns
          </p>
          <p className="text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-[26px] px-6">
            Work in progress...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Returns;
