import React from "react";
import { Store } from "../../redux/Store";
import { useContext } from "react";
import CustomerNav from "./CustomerNav";

function Payments() {
  const { state } = useContext(Store);
  const {
    cart: { paymentMethod, shippingAddress },
  } = state;

  return (
    <div>
      {" "}
      <div className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:m-auto pt-[60px] lg:pt-4 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <CustomerNav />
        <div className="flex flex-col lg:w-[70%] shadow lg:rounded bg-white h-fit">
          <p className="text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-[26px] px-6 border-b">
            My Payments methods
          </p>
          {paymentMethod ? (
            <p className="py-[26px] px-6">
              <span className="text-[1.15rem] font-semibold leading-6 tracking-[-1px]">
                {paymentMethod} to:
              </span>{" "}
              {shippingAddress.address}, {shippingAddress.city},
              {shippingAddress.postalCode}, {shippingAddress.country}.
            </p>
          ) : (
            <p className="py-[26px] px-6">There are no payment method yet..</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payments;
