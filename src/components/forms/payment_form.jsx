import React from "react";
import { BsCashStack, BsCreditCard } from "react-icons/bs";

export default function PaymentForm({ payment, handleChange, submit }) {
  const paymentMethods = [
    {
      id: "Delivery",
      value: "Delivery",
      name: "Cash on delivery",
      icon: <BsCashStack size={25} />,
    },
    {
      id: "Credit card",
      value: "Credit card",
      name: "Online with payment card",
      icon: <BsCreditCard size={25} />,
    },
  ];

  return (
    <div className="flex flex-col px-6 h-fit pb-4 shadow rounded">
      <div className="flex flex-row items-center py-[26px] text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
        <span className="border-2 border-solid border-[#0e001a] rounded-[50%] w-[28px] h-[28px] flex items-center justify-center mr-3 ">
          1
        </span>
        Payment method
      </div>
      <form onSubmit={submit}>
        {paymentMethods.map((method) => (
          <label
            htmlFor={method.id}
            className="flex flex-row items-center p-4 mt-2 border rounded-md cursor-pointer"
          >
            <input
              type="radio"
              name="paymentMethod"
              id={method.id}
              value={method.value}
              checked={payment.paymentMethod === method.value}
              onChange={handleChange}
              className="mr-4"
            />
            <div className="flex flex-row w-full justify-between items-center">
              <span>{method.name} </span>
              <span> {method.icon}</span>
            </div>
          </label>
        ))}
        <button
          type="submit"
          className="rounded-lg mt-4 w-full bg-primary px-8 py-3 text-white transition lg:hover:bg-primary/80 shadow-md"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
