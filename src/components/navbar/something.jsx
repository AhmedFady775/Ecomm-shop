import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { Badge } from "@mui/material";
import Dropdown from "../ui/Dropdown";

function UserDropdown({ open, userList, userInfo, userSignOut }) {
  return (
    <Dropdown open={open} anchorRight>
      <ul className="flex flex-col">
        {userList.map((user) => (
          <Link to={user.link} className="hover:bg-[#f4f5f6] z-50 transition">
            <li className="flex items-center w-full px-4 py-3">
              <div className="flex-4 mr-4">{user.icon}</div>
              {user.name}
            </li>
          </Link>
        ))}
        {userInfo.role === "ADMIN" && (
          <Link to="/admin/dashboard" className="hover:bg-[#f4f5f6] border-y">
            <li className="flex items-center w-full px-4 py-3">
              <div className="flex-4 mr-4">
                <MdOutlineAdminPanelSettings size={25} />
              </div>
              Admin
            </li>
          </Link>
        )}
        <Link onClick={userSignOut} to="/login" className="hover:bg-[#f4f5f6]">
          <li className="flex text-sm items-center w-full px-4 py-3 text-[#0066be]">
            Log out
          </li>
        </Link>
      </ul>
    </Dropdown>
  );
}

export default function Something({
  userInfo,
  menuRef,
  userDropdown,
  setUserDropdown,
  totalQuantity,
  userList,
  userSignOut,
}) {
  console.log(userInfo, userList);
  return (
    <div className="flex flex-row items-center lg:gap-8">
      {userInfo ? (
        <div className="flex flex-col" ref={menuRef}>
          <div
            onClick={() => setUserDropdown(!userDropdown)}
            className="hidden lg:flex flex-row items-center gap-2 text-sm cursor-pointer"
          >
            <RxPerson size={25} />
            <span className="hidden lg:flex text-sm font-normal leading-5 tracking-[0]">
              Hello, {userInfo.name}.
            </span>
          </div>
          <UserDropdown
            open={userDropdown}
            userList={userList}
            userInfo={userInfo}
            userSignOut={userSignOut}
          />
        </div>
      ) : (
        <Link
          className="hidden lg:flex flex-row items-center gap-2 text-sm font-normal leading-5 tracking-[0]"
          to="/login"
        >
          <RxPerson size={20} />
          My account
        </Link>
      )}
      <Link
        className="flex flex-row items-center gap-2 text-sm ml-4 lg:ml-0"
        to="/cart"
      >
        <Badge badgeContent={totalQuantity} color="error">
          <BsCart3 size={22} />
        </Badge>
        <span className="hidden lg:flex text-sm font-normal leading-5 tracking-[0]">
          Cart
        </span>
      </Link>
    </div>
  );
}
