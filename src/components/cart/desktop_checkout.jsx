import React from "react";

export default function DesktopCheckout({ cartItems, checkoutHandler }) {
  return (
    <div className="hidden lg:flex lg:flex-col shadow rounded p-6">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between text-[#7f8286]">
          Quantity
          <span> {cartItems.reduce((a, c) => a + c.quantity, 0)} items</span>
        </div>
        <div className="flex flex-row justify-between text-lg font-semibold leading-6">
          Subtotal{" "}
          <span>
            <p>{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP</p>
          </span>
        </div>
        <button
          type="submit"
          onClick={checkoutHandler}
          className="rounded-lg mt-4 bg-primary px-8 py-3 text-white transition lg:hover:bg-primary/80 shadow-md"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
