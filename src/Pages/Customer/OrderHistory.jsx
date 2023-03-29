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

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const { isLoading, data: orders } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://ecomm12.herokuapp.com/orders/mine", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => res.data),
  });

  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);
  const [ID, setID] = useState(" ");
  console.log(ID);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:mx-auto pt-[60px] lg:py-4 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <CustomerNav />
        <div className="flex flex-col lg:w-[70%] shadow lg:rounded bg-white min-h-[600px]">
          <p className="text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-[26px] px-6">
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
            <div className="flex flex-col">
              <ul className="flex flex-row justify-between px-6 border-y py-4 font-semibold leading-[1.8rem] tracking-[-1px] items-center">
                <li className="w-[10%]">Order ID</li>
                <li className="w-[15%]">Date </li>
                <li className="w-[15%]">Paid </li>
                <li className="w-[15%]">Delivered </li>
                <li className="w-[20%]">Total </li>
                <li className="w-[15%]">Details </li>
              </ul>
              <div className="flex flex-col gap-4">
                {orders?.map((order) => (
                  <ul className="flex flex-row justify-between p-6 border-b items-center">
                    <li className="w-[10%]">{order._id.substring(0, 6)}</li>
                    <li className="w-[15%]">
                      {order.createdAt.substring(0, 10)}
                    </li>
                    <li className="w-[15%]">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <div className="py-1 px-3 text-sm font-semibold rounded bg-red-200 w-fit">
                          <span className="circle text-red-600"></span>
                          Unpaid
                        </div>
                      )}
                    </li>
                    <li className="w-[15%]">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <div className="py-1 px-3 text-sm font-semibold rounded bg-red-200 w-fit">
                          <span className="circle text-red-600"></span>
                          No
                        </div>
                      )}
                    </li>
                    <li className="w-[20%]">
                      {order.totalPrice.toFixed(2)} EGP
                    </li>
                    <li className="w-[15%]">
                      <OrderModal id={order._id} render={true} open={false} />
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
