import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TbTruckReturn } from "react-icons/tb";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function EmptyCart() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white py-6 px-4 mb-4 shadow items-center">
        <div className="flex flex-col lg:max-w-[328px]">
          <div className="flex justify-center">
            <img src="./shopping-cart.png" className="h-[160px]" />
          </div>
          <div className="py-6 text-center">
            <p className="text-xl text-[#0e001a] font-semibold">
              Your shopping cart is empty!{" "}
            </p>
            <p className="font-normal text-sm text-[#7f8286]">
              ECOMM is the #1 place for all your surveillance devices needs,
              explore our wide range of products, flexible payments & offers!
            </p>
          </div>
          <Link className="flex flex-col" to="/">
            <button className="border-[#c3c7cc] hover:bg-[#f4f5f6] hover:border-[#f4f5f6] p-4 flex flex-col items-center border font-semibold rounded-md text-[#0e001a]">
              Shop now!
            </button>
          </Link>
        </div>
      </div>
      <ul className="flex flex-col bg-white p-4 mb-4 shadow ">
        <li className="flex flex-row">
          <HiOutlineCreditCard className="mr-3" size={30} />
          <div className="flex flex-col w-full">
            <p className="text-sm font-semibold pb-2">Pay on delivery</p>
            <p className="text-sm font-normal pb-3">For all orders</p>
            <hr className="h-[1px] mb-3" />
          </div>
        </li>
        <li className="flex flex-row">
          <TbTruckReturn className="mr-3" size={30} />
          <div className="flex flex-col  w-full">
            <p className="text-sm font-semibold pb-2">Return policy</p>
            <p className="text-sm font-normal pb-3">
              Most items can be returned within 30 days of delivery
            </p>
            <hr className="h-[1px] mb-3" />
          </div>
        </li>
        <li className="flex flex-row">
          <AiOutlineQuestionCircle className="mr-3" size={30} />
          <div className="flex flex-col  w-full">
            <p className="text-sm font-semibold pb-2">Have a question?</p>
            <p className="text-sm font-normal pb-3">*****</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
