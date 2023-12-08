import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { CartItemsStore, userInfoStore } from "../../suztand/Store";
import { RiArrowDownSLine } from "react-icons/ri";
import { useRef } from "react";
import { useEffect } from "react";
import List from "./list";
import Something from "./something";
import { userList } from "./constants";
import CategoriesMenuDropdown from "./categories_menu_dropdown";

function TopNav() {
  return (
    <nav className="hidden lg:flex bg-[#0e001a] text-white h-10">
      <ul className="h-full flex flex-row items-center justify-between lg:w-max-[1184px] lg:w-[1184px] lg:m-auto text-xs">
        <ul className="flex flex-row space-x-4">
          <li>AR</li>
          <li>
            <span className="text-gray-400">My delivery area:</span> Cairo.
          </li>
        </ul>
        <li>Call *****</li>
      </ul>
    </nav>
  );
}

function Search() {
  return (
    <div className="flex flex-row justify-end w-full lg:w-[50%] items-center h-12 text-[#7f8286] relative">
      <input
        placeholder="Search"
        className="flex p-[6px] lg:p-[12px] w-full bg-[#f4f5f6] rounded"
      />
      <FiSearch size={20} className="absolute right-4" />
    </div>
  );
}

function CategoriesMenu({ menuRef, categoriesMenu, setCategoriesMenu }) {
  return (
    <div className="hidden lg:flex flex-col ml-10" ref={menuRef}>
      <button
        className="cursor-pointer flex items-center p-3 hover:bg-[#f4f5f6] transition rounded-lg font-semibold"
        onClick={() => setCategoriesMenu(!categoriesMenu)}
      >
        Categories <RiArrowDownSLine size={22} />
      </button>
      <CategoriesMenuDropdown
        categoriesMenu={categoriesMenu}
        setCategoriesMenu={setCategoriesMenu}
      />
    </div>
  );
}

function Navbar() {
  let menuRef = useRef();

  const { userInfo, userSignOut } = userInfoStore();
  const { getTotalItemsQuantity } = CartItemsStore();
  const totalQuantity = getTotalItemsQuantity();
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [Drawer, setDrawer] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setUserDropdown(false);
        setCategoriesMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <TopNav />
      <nav
        className={`h-14 lg:h-20 bg-white text-black ${
          categoriesMenu ? " " : "shadow-sm"
        }`}
      >
        <section className="flex flex-row items-center justify-between h-full min-w-[1024px] max-w-[1184px] lg:m-auto px-3 lg:px-0">
          <span className="flex lg:hidden">
            <MenuIcon fontSize="large" />
          </span>
          <div className="flex flex-row items-center">
            <Link className="flex mx-4 lg:mx-0" to="/">
              <p className="text-2xl md:text-3xl font-bold Robot">V2S</p>
            </Link>
            <CategoriesMenu
              menuRef={menuRef}
              categoriesMenu={categoriesMenu}
              setCategoriesMenu={setCategoriesMenu}
            />
          </div>
          <Search />
          <Something
            userList={userList}
            userSignOut={userSignOut}
            totalQuantity={totalQuantity}
            menuRef={menuRef}
            userInfo={userInfo}
            userDropdown={userDropdown}
            setUserDropdown={setUserDropdown}
          />
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
