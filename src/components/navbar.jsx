import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { Drawer } from "@mui/material";
import { Store } from "../redux/Store";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Badge from "@mui/material/Badge";

import { BsPersonGear } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import { FiRefreshCw } from "react-icons/fi";
import {
  MdKeyboardArrowDown,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";

import { AiFillCreditCard } from "react-icons/ai";
import { MdAssignmentInd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { BsBox } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import Dropdown from "./Dropdown";
import DropDownList from "./DropDownList";
import { userInfoStore } from "../suztand/Store";

function Navbar() {
  let menuRef = useRef();

  const { state } = useContext(Store);
  const { cart } = state;
  const userInfo = userInfoStore((state) => state.userInfo);
  const UserSignOut = userInfoStore((state) => state.userSignOut);

  const { dispatch: ctxDispatch } = useContext(Store);

  const [openCategoriesMenu, setopenCategoriesMenu] = useState(false);
  const [openUserMenu, setopenUserMenu] = useState(false);
  //signout
  const signoutHandler = () => {
    UserSignOut();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const categoriesList = [
    {
      link: "/category/camera",
      name: "Cameras",
      image:
        "https://i1.adis.ws/i/canon/Dome-camera_960x1080-b06d4418-8d22-11eb-ad11-b083fe5731f9?w=720&qlt=90&fmt=jpg&fmt.options=interlaced&bg=rgb(255,255,255)",
    },
    {
      link: "/category/wire",
      name: "Wires",
      image:
        "https://5.imimg.com/data5/FC/BP/MY-18879959/flexible-wire-500x500.jpg",
    },
    {
      link: "/category/device",
      name: "Devices",
      image:
        "https://www.dseinternational.com/images/librariesprovider8/counter-surveillance-tscm-equipment/vosker.jpg",
    },
  ];

  const userList = [
    {
      link: "/customer/account",
      name: "Account",
      icon: <BsPersonGear size={25} />,
    },
    {
      link: "/customer/myorders",
      name: "Orders",
      icon: <BsBoxSeam size={22} />,
    },
    {
      link: "/customer/payments",
      name: "Payments",
      icon: <GoCreditCard size={22} />,
    },
    {
      link: "/customer/returns",
      name: "Returns",
      icon: <FiRefreshCw size={22} />,
    },
  ];

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setopenUserMenu(false);
        setopenCategoriesMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const list = () => (
    <div className="w-[80vw] h-full bg-[f7f7f7]">
      <section className="flex-col flex text-black font-medium">
        <div
          onClick={toggleDrawer(false)}
          className="absolute right-2 top-2 bg-gray-200 rounded-full flex items-center p-1"
        >
          <IoMdClose sx={{ fontSize: 20 }} />
        </div>
        <ul className="flex flex-col text-black text-sm mt-10">
          <li className="nav-item flex flex-row justify-between text-gray-400 border-b-8 border-gray-100">
            My delivery area: <span className="text-blue-500">Cairo</span>
          </li>
          {userInfo ? (
            <div>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<RiArrowDownSLine size={22} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="flex flex-row items-center">
                    <RxPerson size={22} />
                    <span className="ml-4">Hello, {userInfo.firstName}</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails onClick={toggleDrawer(false)}>
                  <Link to="/customer/account">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <RxPerson size={22} />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link to="/customer/myorders">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <AssignmentIcon fontSize="small" />
                      </ListItemIcon>
                      Orders
                    </MenuItem>
                  </Link>
                  <Link to="/customer/payments">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <CreditCardIcon fontSize="small" />
                      </ListItemIcon>
                      Payments
                    </MenuItem>
                  </Link>
                  <Link to="/customer/returns">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <AssignmentReturnIcon fontSize="small" />
                      </ListItemIcon>
                      Returns
                    </MenuItem>
                  </Link>
                  <Divider />
                  {userInfo && userInfo.isAdmin ? (
                    <Link to="/admin/dashboard">
                      <MenuItem sx={{ py: 1.5 }}>
                        <ListItemIcon>
                          <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Admin
                      </MenuItem>
                    </Link>
                  ) : null}
                  <Divider />
                  <Link to="/login" onClick={signoutHandler}>
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            <li className="nav-item ">
              <Link onClick={toggleDrawer(false)} to="/login">
                Sign in/ Sign up
              </Link>
            </li>
          )}

          <Link onClick={toggleDrawer(false)} to="/login">
            <li className="nav-item border-t-2 border-b-8 border-gray-100">
              <span className="mr-4">
                <BsBox size={22} />
              </span>
              Track your order
            </li>
          </Link>

          {categoriesList.map((category, i) => (
            <Link key={i} onClick={toggleDrawer(false)} to={category.link}>
              <li className="nav-item border-b-2 border-gray-100">
                {category.name}
              </li>
            </Link>
          ))}

          <li className="nav-item border-b-8 border-t-[6px] border-gray-100">
            <span className="mr-4">
              <BsTelephone size={22} />
            </span>
            Call *****
          </li>
          <li className="nav-item flex flex-row justify-between">
            Switch language <span className="text-blue-500">AR</span>
          </li>
        </ul>
      </section>
    </div>
  );

  return (
    <div className="sticky top-0 z-50">
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
      <nav
        className={`h-14 lg:h-20 bg-white text-black ${
          openCategoriesMenu ? " " : "shadow-sm"
        }`}
      >
        <section className="flex flex-row items-center justify-between h-full lg:w-max-[1184px] lg:w-[1184px] lg:m-auto px-3 lg:px-0">
          <span className="flex lg:hidden">
            <MenuIcon onClick={toggleDrawer(true)} fontSize="large" />
            <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </span>
          <div className="flex flex-row items-center">
            <Link className="flex mx-4 lg:mx-0" to="/">
              <p className="text-2xl md:text-3xl font-bold Robot">V2S</p>
            </Link>
            <div className="hidden lg:flex flex-col ml-10" ref={menuRef}>
              <button
                className="cursor-pointer flex items-center p-3 hover:bg-[#f4f5f6] transition rounded-lg font-semibold"
                onMouseEnter={() => setopenCategoriesMenu(!openCategoriesMenu)}
              >
                Categories <RiArrowDownSLine size={22} />
              </button>
              <DropDownList open={openCategoriesMenu}>
                <ul
                  onMouseLeave={() => setopenCategoriesMenu(false)}
                  className="flex flex-col"
                >
                  {categoriesList.map((category, i) => (
                    <Link
                      to={category.link}
                      className={`hover:bg-[#f4f5f6] transition ${
                        categoriesList.length - 1 === i ? "rounded-b-lg" : " "
                      }`}
                    >
                      <li
                        className={`flex items-center ${
                          categoriesList.length - 1 === i ? "" : "border-b"
                        } w-full p-3`}
                      >
                        <div className="flex w-8 h-8 mr-4">
                          <img
                            className="w-full h-full object-cover"
                            src={category.image}
                          />
                        </div>
                        {category.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </DropDownList>
            </div>
          </div>
          <div className="flex flex-row justify-end w-full lg:w-[50%] items-center h-12 text-[#7f8286] relative">
            <input
              placeholder="Search"
              className="flex p-[6px] lg:p-[12px] w-full bg-[#f4f5f6] rounded"
            />
            <FiSearch size={20} className="absolute right-4" />
          </div>
          <div className="flex flex-row items-center lg:gap-8">
            {userInfo ? (
              <div className="flex flex-col" ref={menuRef}>
                <div
                  onClick={() => setopenUserMenu(!openUserMenu)}
                  className="hidden lg:flex flex-row items-center gap-2 text-sm cursor-pointer"
                >
                  <RxPerson size={25} />
                  <span className="hidden lg:flex text-sm font-normal leading-5 tracking-[0]">
                    Hello, {userInfo.firstName}.
                  </span>
                </div>
                <Dropdown open={openUserMenu} anchorRight>
                  <ul
                    className="flex flex-col"
                    onClick={() => {
                      console.log("clicked");
                      setopenUserMenu(false);
                    }}
                  >
                    {userList.map((user) => (
                      <Link
                        to={user.link}
                        className="hover:bg-[#f4f5f6] z-50 transition"
                      >
                        <li className="flex items-center w-full px-4 py-3">
                          <div className="flex-4 mr-4">{user.icon}</div>
                          {user.name}
                        </li>
                      </Link>
                    ))}
                    {userInfo.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="hover:bg-[#f4f5f6] border-y"
                      >
                        <li className="flex items-center w-full px-4 py-3">
                          <div className="flex-4 mr-4">
                            <MdOutlineAdminPanelSettings size={25} />
                          </div>
                          Admin
                        </li>
                      </Link>
                    )}
                    <Link
                      to="/login"
                      onClick={signoutHandler}
                      className="hover:bg-[#f4f5f6]"
                    >
                      <li className="flex text-sm items-center w-full px-4 py-3 text-[#0066be]">
                        Log out
                      </li>
                    </Link>
                  </ul>
                </Dropdown>
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
              <Badge
                badgeContent={cart.cartItems.reduce(
                  (a, c) => a + c.quantity,
                  0
                )}
                color="error"
              >
                <BsCart3 size={22} />
              </Badge>
              <span className="hidden lg:flex text-sm font-normal leading-5 tracking-[0]">
                Cart
              </span>
            </Link>
          </div>
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
