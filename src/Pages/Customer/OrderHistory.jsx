import React from "react";
import { Store } from "../../redux/Store";
import { useContext } from "react";
import CustomerNav from "./CustomerNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import EMPTY from "../../assets/empty_orders.jpg";
import { useState } from "react";
import OrderModal from "../../components/OrderModal";
import { userInfoStore } from "../../suztand/Store";

function OrderHistory() {
  const userInfo = userInfoStore((state) => state.userInfo);

  const { isLoading, data: orders } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://ecomm12.herokuapp.com/orders/mine", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => res.data),
  });

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:mx-auto pt-[60px] lg:py-4 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <CustomerNav />
        <div className="flex flex-col lg:w-[70%] shadow lg:rounded bg-white h-fit">
          <p className="text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-[26px] px-6 border-b lg:border-none">
            My orders
          </p>
          {isLoading ? (
            <div className="flex flex-col px-4 py-6 items-center">
              <CircularProgress />
            </div>
          ) : orders?.length === 0 ? (
            <div className="flex flex-col p-6 items-center">
              <img className="h-[260px] mb-6" src={EMPTY} />
              <p className="text-[1.3rem] font-semibold leading-[1.8rem] tracking-[-1px]">
                There are no orders
              </p>
              <p className="text-sm font-normal leading-5 tracking-[0] text-[#7f8286]">
                Your orders will show here after buying something.
              </p>
            </div>
          ) : (
            <div className="flex flex-col min-h-[300px]">
              <ul className="lg:flex flex-row justify-between px-6 border-y py-4 font-semibold leading-[1.8rem] items-center hidden">
                <li className="w-[10%]">Order ID</li>
                <li className="w-[15%]">Date </li>
                <li className="w-[15%]">Paid </li>
                <li className="w-[15%]">Delivered </li>
                <li className="w-[20%]">Total </li>
                <li className="w-[15%]">Details </li>
              </ul>
              <div className="flex flex-col">
                {orders?.map((order) => (
                  <ul className="flex flex-col lg:flex-row justify-between px-6 py-4 lg:p-6 border-b lg:items-center">
                    <li className="lg:w-[10%] flex flex-row items-center">
                      <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem]">
                        Order ID:{" "}
                      </span>
                      #{order._id.substring(0, 6)}
                    </li>
                    <li className="lg:w-[15%] flex flex-row items-center">
                      <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem]">
                        Date:{" "}
                      </span>
                      {order.createdAt.substring(0, 10)}
                    </li>
                    <li className="lg:w-[15%] flex flex-row items-center">
                      {order.isPaid ? (
                        <div className="flex flex-row items-center">
                          <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem] my-2">
                            Paid:
                          </span>
                          <div className="py-1 px-3 text-sm font-semibold rounded bg-green-200 w-fit">
                            <span className="circle text-green-600"></span>
                            Paid
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center">
                          <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem] my-2">
                            Paid:
                          </span>
                          <div className="py-1 px-3 text-sm font-semibold rounded bg-red-200 w-fit">
                            <span className="circle text-red-600"></span>
                            Unpaid
                          </div>
                        </div>
                      )}
                    </li>
                    <li className="lg:w-[15%]">
                      {order.isDelivered ? (
                        <div className="flex flex-row items-center">
                          <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem] my-2">
                            Delivered:
                          </span>
                          <div className="py-1 px-3 text-sm font-semibold rounded bg-green-200 w-fit">
                            <span className="circle text-green-600"></span>
                            Yes
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center">
                          <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem] my-2">
                            Delivered:
                          </span>
                          <div className="py-1 px-3 text-sm font-semibold rounded bg-red-200 w-fit">
                            <span className="circle text-red-600"></span>
                            No
                          </div>
                        </div>
                      )}
                    </li>
                    <li className="lg:w-[20%] flex flex-row items-center">
                      <span className="flex lg:hidden mr-2 font-semibold leading-[1.8rem]">
                        Total:{" "}
                      </span>
                      {order.totalPrice.toFixed(2)} EGP
                    </li>
                    <li className="lg:w-[15%] flex flex-row items-center mt-2">
                      <button
                        onClick={() => {
                          setOpen(!open);
                        }}
                        className="bg-[#0e001a] hover:bg-[#0e001ac5] rounded text-white text-sm font-semibold py-2 px-3 transition"
                      >
                        Details
                      </button>
                      <OrderModal
                        id={order._id}
                        onClose={() => setOpen(false)}
                        open={open}
                      />
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
