import React from "react";
import { useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { AiOutlineDropbox } from "react-icons/ai";
import { FaTruck } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { updateWidthState } from "../../suztand/Store";
import { motion } from "framer-motion";

function AdminNav() {
  const noFullWidth = updateWidthState((state) => state.width);
  const handleNoFullWidth = updateWidthState((state) => state.setWidth);

  const { pathname } = useLocation();

  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);

  return (
    <motion.div
      animate={{ width: noFullWidth ? "112px" : "288px" }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={`flex flex-col ${
        noFullWidth ? "w-28 items-center" : "w-72"
      }  bg-[#1a1c1f] px-[26px] py-[36px] h-screen text-[#fbfafa] justify-between top-0 sticky`}
    >
      <button
        onClick={handleNoFullWidth}
        className="absolute right-[-20px] top-[32px] rounded-full shadow-[0_0px_10px_1px_rgb(0,0,0,0.1)]  flex w-10 h-10 justify-center items-center bg-[#fbfafa] text-[#1a1c1f]"
      >
        {noFullWidth ? (
          <MdKeyboardArrowRight size={35} />
        ) : (
          <MdKeyboardArrowLeft size={35} />
        )}
      </button>
      <ul
        className={`flex flex-col overflow-hidden ${
          noFullWidth ? "items-center" : " "
        } text-base`}
      >
        <Link to="/">
          <li className="flex items-end font-semibold text-2xl cursor-pointer">
            ECOMM
            {noFullWidth ? null : (
              <span className="text-lg text-[#68686a] ml-2">Dashboard</span>
            )}
          </li>
        </Link>
        <li className="flex mt-20 mb-4 text-[#68686a] font-medium">Menu</li>
        <Link to="/admin/dashboard">
          <li
            className={`flex items-center over p-3 my-1 hover:bg-[#68686a21] rounded-lg transition cursor-pointer ${
              pathname === "/admin/dashboard" ? "bg-[#68686a21]" : null
            }`}
          >
            <MdDashboard
              size={22}
              className={`${noFullWidth ? null : "mr-4"}`}
            />
            {noFullWidth ? null : "Dashboard"}
          </li>
        </Link>
        <li>
          <div
            className="flex flex-row justify-between p-3 my-1 hover:bg-[#68686a21] rounded-lg transition w-full cursor-pointer"
            onClick={() => setShowProductsDropdown(!showProductsDropdown)}
          >
            <div className="flex items-center">
              <AiOutlineDropbox
                size={22}
                className={`${noFullWidth ? null : "mr-4"}`}
              />
              {noFullWidth ? null : "Products"}
            </div>
            {noFullWidth ? null : showProductsDropdown ? (
              <MdKeyboardArrowUp size={22} />
            ) : (
              <MdKeyboardArrowDown size={22} />
            )}
          </div>
          <motion.div
            initial={false}
            className="overflow-hidden"
            animate={{ height: showProductsDropdown ? "auto" : 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <ul className="flex flex-col">
              <Link to="/admin/products/create">
                <li
                  className={`mx-9 p-3 my-1 cursor-pointer hover:bg-[#68686a21] rounded-lg transition ${
                    pathname === "/admin/products/create"
                      ? "bg-[#68686a21]"
                      : null
                  }`}
                >
                  Create Products
                </li>
              </Link>
              <Link to="/admin/products/edit">
                <li
                  className={`mx-9 p-3 my-1 cursor-pointer hover:bg-[#68686a21] rounded-lg transition ${
                    pathname === "/admin/products/edit"
                      ? "bg-[#68686a21]"
                      : null
                  }`}
                >
                  Edit Products
                </li>
              </Link>
            </ul>
          </motion.div>
        </li>
        <Link to="/admin/orders">
          <li
            className={`flex items-center p-3 my-1 hover:bg-[#68686a21] rounded-lg transition cursor-pointer ${
              pathname === "/admin/orders" ? "bg-[#68686a21]" : null
            }`}
          >
            <FaTruck size={22} className={`${noFullWidth ? null : "mr-4"}`} />
            {noFullWidth ? null : "Orders"}
          </li>
        </Link>
        <li>
          <div
            className="flex flex-row justify-between p-3 my-1 hover:bg-[#68686a21] rounded-lg transition w-full cursor-pointer"
            onClick={() => setShowUsersDropdown(!showUsersDropdown)}
          >
            <div className="flex items-center">
              <FaUserEdit
                size={22}
                className={`${noFullWidth ? null : "mr-4"}`}
              />
              {noFullWidth ? null : "Users"}
            </div>
            {noFullWidth ? null : showUsersDropdown ? (
              <MdKeyboardArrowUp size={22} />
            ) : (
              <MdKeyboardArrowDown size={22} />
            )}
          </div>
          <motion.div
            initial={false}
            className="overflow-hidden"
            animate={{ height: showUsersDropdown ? "auto" : 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <ul className="flex flex-col">
              <Link to="/admin/users">
                <li className="mx-9 p-3 my-1 cursor-pointer hover:bg-[#68686a21] rounded-lg transition">
                  Create users
                </li>
              </Link>
              <Link to="/admin/users">
                <li className="mx-9 p-3 my-1 cursor-pointer hover:bg-[#68686a21] rounded-lg transition">
                  Edit users
                </li>
              </Link>
            </ul>
          </motion.div>
        </li>
      </ul>
      <ul>Admin</ul>
    </motion.div>
  );
}

export default AdminNav;
