import React from "react";
import ReactLoading from "react-loading";

export default function ConfirmOrder({
  cartItems,
  paymentChecked,
  shipmentChecked,
  loading,
  placeOrderHandler,
}) {
  return (
    <div className="lg:w-[40%] lg:rounded shadow bg-white mt-4 lg:mt-0 pb-[26px] h-fit fontTech px-6">
      <p className="py-6 text-[1.15rem] font-semibold leading-6 tracking-[-1px]">
        Order summary.
      </p>
      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-normal leading-5 tracking-[0] text-[#0e001a] pb-3">
          Quantity
          <span>{cartItems.reduce((a, c) => a + c.quantity, 0)} items</span>
        </div>
        <div className="flex justify-between text-sm font-normal leading-5 tracking-[0] text-[#0e001a] pb-3">
          Item value
          <span>
            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
          </span>
        </div>
        <div className="flex justify-between text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-4 border-t">
          Total
          <span>
            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
          </span>
        </div>
      </div>
      {paymentChecked && shipmentChecked ? (
        loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-primary px-8 py-2 text-white transition h-10 w-full"
          >
            <ReactLoading
              type="bubbles"
              color="#ffffff"
              height={25}
              width={25}
            />
          </button>
        ) : (
          <button
            type="submit"
            onClick={placeOrderHandler}
            className="rounded-lg w-full bg-primary px-8 py-3 text-white transition lg:hover:bg-primary/80 shadow-md"
          >
            Continue
          </button>
        )
      ) : (
        <button
          disabled
          className="rounded-lg w-full bg-gray-500 px-8 py-3 text-white transition shadow-md cursor-not-allowed"
        >
          Continue
        </button>
      )}
    </div>
  );
}
