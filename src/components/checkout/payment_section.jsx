import React from "react";
import PaymentForm from "../forms/payment_form";
import { MdDone } from "react-icons/md";

export default function PaymentSection({
  checked,
  submit,
  edit,
  payment,
  handleChange,
}) {
  return checked ? (
    <div className="flex flex-col px-6 pb-4 shadow rounded">
      <div className="flex flex-row items-center justify-between py-[26px] text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
        <div className="flex flex-row items-center">
          <span className="border-2 border-solid border-[#009f29] text-[#009f29] rounded-[50%] w-[28px] h-[28px] flex items-center justify-center mr-3 ">
            <MdDone />
          </span>
          Payment method
        </div>
        <span
          onClick={edit}
          className="text-sm font-normal leading-5 tracking-[0] text-[#0066be] cursor-pointer"
        >
          edit
        </span>
      </div>
    </div>
  ) : (
    <PaymentForm
      payment={payment}
      handleChange={handleChange}
      submit={submit}
    />
  );
}
