import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

export default function CartItem({
  item,
  updateItemQuantity,
  removeItemHandler,
}) {
  return (
    <div className="flex flex-col py-6 px-4 border-b w-full" key={item.id}>
      <div className="flex flex-row">
        <div className="flex flex-col pr-8">
          <Link className="h-[72px] w-[72px]" to={`/products/${item._id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </Link>
          <select
            onChange={(e) => {
              updateItemQuantity(item, Number(e.target.value));
            }}
            value={item.quantity}
            className="flex lg:hidden mt-4 py-4 pr-3 pl-4 rounded-md w-[64px] cursor-pointer border-1 border-gray-300 text-[#0e001a] hover:border-[#0e001a] focus:ring-[#0e001a] focus:border-transparent"
          >
            {[...Array(item.countInStock)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between w-full">
          <div className="flex flex-col">
            <Link to={`/products/${item._id}`}>
              <p className="text-base">{item.slug}</p>
              <p className="text-base pb-2">Vendor: V2S</p>
            </Link>
            <div className="flex flex-row items-end">
              <p className="leading-4 text-xl	font-semibold"> {item.price}</p>
              <p className="text-xs ml-1 leading-3">EGP</p>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col mt-4 lg:mt-0 text-[#0066be] text-sm font-normal lg:items-end">
            <select
              onChange={(e) => {
                updateItemQuantity(item, Number(e.target.value));
              }}
              value={item.quantity}
              className="hidden lg:flex mb-4 py-4 pr-3 pl-4 rounded-md w-[64px] cursor-pointer border-1 border-gray-300 text-[#0e001a] hover:border-[#0e001a] focus:ring-[#0e001a] focus:border-transparent"
            >
              {[...Array(item.countInStock)].map((_, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <div
              onClick={() => {
                removeItemHandler(item);
              }}
              className="flex flex-row items-center pr-6 lg:pr-0 lg:mb-4 cursor-pointer hover:text-red-500 transition"
            >
              <FaRegTrashAlt className="pr-1" /> Remove
            </div>
            {/* <div className="flex flex-row items-center cursor-pointer">
              <AiOutlineHeart size={20} className="pr-1 cursor-pointer" /> Save
              for later
            </div>{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
}
