import React from "react";
import { Store } from "../../redux/Store";
import { useContext } from "react";
import CustomerNav from "./CustomerNav";

function Payments() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div>
      {" "}
      <div className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:m-auto pt-[60px] lg:pt-4 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <CustomerNav />
        <div className="flex flex-col lg:w-[70%] p-6 shadow lg:rounded bg-white h-fit">
          <p className="text-[2.5rem] font-semibold leading-[3rem] tracking-[-2px]">
            Good morning, {userInfo.firstName}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payments;
