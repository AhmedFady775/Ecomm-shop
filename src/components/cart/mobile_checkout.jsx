import React from "react";

export default function MobileCheckout({ cartItems, checkoutHandler }) {
  return cartItems.length === 0 ? null : (
    <div className="fixed flex flex-row justify-between items-center lg:hidden bottom-0 px-4 py-3 w-full bg-white drop-shadow-[0_50px_50px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col">
        <p className="text-sm font-normal text-[#7f8286] leading-5">
          Subtotal for {cartItems.reduce((a, c) => a + c.quantity, 0)} items
        </p>
        <p className="text-lg font-semibold leading-6">
          {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
        </p>
      </div>
      <button
        type="submit"
        onClick={checkoutHandler}
        className="rounded flex mt-4 bg-primary px-8 py-2 text-white transition lg:hover:bg-primary/80 h-10"
      >
        Checkout
      </button>
    </div>
  );
}
