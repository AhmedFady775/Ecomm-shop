import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { CartItemsStore, userInfoStore } from "../suztand/Store";
import { MdDone } from "react-icons/md";

export default function OrderReceipt() {
  const { id } = useParams();
  const { userInfo } = userInfoStore();
  const { clearCart } = CartItemsStore();

  const { isLoading, data: order } = useQuery({
    queryKey: ["OrderReceipt", id],
    queryFn: () =>
      fetch(`http://localhost:3001/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    clearCart();
  }, [id]);

  return isLoading ? (
    <div className="flex justify-center p-36">
      <CircularProgress color="inherit" />
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row min-w-[1024px] max-w-[1184px] mx-auto mt-4">
      <div className="flex flex-col lg:p-4 lg:rounded lg:shadow w-full h-fit lg:mr-4 bg-white">
        <p className="py-4 border-b">
          <strong className="text-lg">Order receipt</strong>
        </p>
        <strong className="text-lg py-4 border-b">ID: {id}</strong>
        <div className="flex flex-col w-full">
          <div className="placeOrderCont py-4 border-b">
            <div className="placeOrderHeader">
              <strong>Shipping</strong>
            </div>
            <div>
              <strong>Name:</strong> {order.shippingAddress.fullName}. <br />
              <strong>Address: </strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}.
            </div>
          </div>

          <div className="placeOrderCont py-4 border-b">
            <div className="placeOrderHeader">
              <strong>Payment Method</strong>
            </div>
            <div>
              <strong>Method:</strong> {order.paymentMethod}.
            </div>
          </div>

          <div className="placeOrderCont py-4 border-b">
            <div className="placeOrderHeader">
              <strong>Items</strong>
            </div>
            <div className="placeOrderItems text-sm">
              {order.orderItems.map((order) => (
                <div className="wholeOrderItem" key={order.id}>
                  <div className="orderItemPart">
                    <Link
                      className="text-blue-400 underline"
                      to={`/products/${order._id}`}
                    >
                      <div className="p-2">
                        <img
                          className="w-16 h-12 object-contain"
                          src={order.image}
                          alt={order.name}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="orderItemPart">
                    <Link
                      className="text-blue-400 underline"
                      to={`/products/${order._id}`}
                    >
                      {order.name}
                    </Link>
                  </div>
                  <div className="orderItemPart" key={order.id}>
                    <div className="orderItemQuan">
                      <span>{order.quantity}</span>
                    </div>
                  </div>
                  <div className="orderItemPart">{order.price} EGP</div>
                </div>
              ))}
            </div>
          </div>
          <div className="placeOrderCont py-4 border-b">
            <div className="placeOrderHeader">
              <strong>Order Summary</strong>
            </div>
            <div className="h3Padding">
              <strong>Items price</strong>
              <p>{order.itemsPrice.toFixed(2)} EGP</p>
              <strong>Shipping</strong>
              <p>{order.shippingPrice.toFixed(2)} EGP</p>
              <strong>Tax</strong>
              <p>{order.taxPrice.toFixed(2)} EGP</p>
            </div>
          </div>
          <div></div>
          <div className="flex flex-col py-4">
            <strong className="placeOrderHeader"> Order Total</strong>
            <strong>{order.totalPrice.toFixed(2)} EGP</strong>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col p-4 rounded shadow lg:w-[30%] h-fit items-center text-center text-lg font-semibold">
        <span className="border-4 border-solid border-[#009f29] text-[#009f29] rounded-[50%] w-[56px] h-[56px] flex items-center justify-center mb-4 ">
          <MdDone size={40} />
        </span>
        <div>
          Thank You <br /> your order successfully
          <br />
          has been placed.
        </div>
      </div>
    </div>
  );
}
