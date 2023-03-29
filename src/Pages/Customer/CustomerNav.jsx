import React from "react";
import { Link } from "react-router-dom";

function CustomerNav() {
  return (
    <div className="flex flex-col lg:w-[30%] lg:mr-6 shadow lg:rounded bg-white">
      <ul className="flex flex-col">
        <Link
          to="/customer/account"
          className=" text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6]"
        >
          <li className="flex flex-row items-center justify-between px-[24px] py-[10px] border-b h-[57px]">
            Account Details
          </li>
        </Link>

        <Link
          to="/customer/account"
          className=" text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6]"
        >
          <li className="flex flex-row items-center justify-between px-[24px] py-[10px] border-b h-[57px]">
            Account Details
          </li>
        </Link>

        <Link
          to="/customer/account"
          className="text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6]"
        >
          <li className="flex flex-row items-center justify-between px-[24px] py-[10px] border-b h-[57px]">
            Account Details
          </li>
        </Link>
        <Link
          to="/customer/account"
          className=" text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6]"
        >
          <li className="flex flex-row items-center justify-between px-[24px] py-[10px] border-b h-[57px]">
            Account Details
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default CustomerNav;
