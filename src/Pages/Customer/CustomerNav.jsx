import React from "react";
import { Link } from "react-router-dom";
import { Store } from "../../redux/Store";
import { BsPersonGear } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import { FiRefreshCw } from "react-icons/fi";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TbTruckReturn } from "react-icons/tb";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function CustomerNav() {
  const location = useLocation();
  const { dispatch: ctxDispatch } = useContext(Store);
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <div className="flex flex-col lg:w-[30%] ">
      <div className="flex flex-col lg:mr-6 shadow lg:rounded bg-white h-fit mb-4">
        <ul className="flex flex-col">
          <Link
            to="/customer/account"
            className={
              location.pathname === "/customer/account"
                ? "text-sm font-semibold leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
                : "text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
            }
          >
            <li className="flex flex-row items-center px-[24px] py-[10px] border-b h-[57px] ">
              <span className="mr-6">
                <BsPersonGear size={25} />
              </span>
              Account details
            </li>
          </Link>

          <Link
            to="/customer/myorders"
            className={
              location.pathname === "/customer/myorders"
                ? "text-sm font-semibold leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
                : "text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
            }
          >
            <li className="flex flex-row items-center px-[24px] py-[10px] border-b h-[57px]">
              <span className="mr-6">
                <BsBoxSeam size={25} />
              </span>
              My orders
            </li>
          </Link>

          <Link
            to="/customer/payments"
            className={
              location.pathname === "/customer/payments"
                ? "text-sm font-semibold leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
                : "text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
            }
          >
            <li className="flex flex-row items-center px-[24px] py-[10px] border-b h-[57px]">
              <span className="mr-6">
                <GoCreditCard size={25} />
              </span>
              Payments
            </li>
          </Link>
          {/* <Link
            to="/customer/returns"
            className={
              location.pathname === "/customer/returns"
                ? "text-sm font-semibold leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
                : "text-sm font-normal leading-5 tracking-[0] hover:bg-[#f4f5f6] transition"
            }
          >
            <li className="flex flex-row items-center px-[24px] py-[10px] border-b h-[57px]">
              <span className="mr-6">
                <FiRefreshCw size={25} />
              </span>
              Returns
            </li>
          </Link> */}
          <li
            onClick={signoutHandler}
            className="flex flex-row cursor-pointer items-center px-[24px] py-[10px] border-b h-[57px] text-sm font-normal leading-5 tracking-[0] text-[#0066be] hover:bg-[#f4f5f6] transition"
          >
            Logout
          </li>
        </ul>
      </div>
      <div className="hidden lg:flex flex-col lg:mr-6  shadow lg:rounded bg-white h-fit">
        <ul className="flex flex-col bg-white p-4">
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
    </div>
  );
}

export default CustomerNav;
