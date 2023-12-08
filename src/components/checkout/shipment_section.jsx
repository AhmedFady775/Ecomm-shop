import React from "react";
import ShipmentForm from "../forms/shipment_form";
import { MdDone } from "react-icons/md";

export default function ShipmentSection({
  checked,
  submit,
  edit,
  shipment,
  paymentChecked,
  handleChange,
  shipmentErrors,
  shipmentTouched,
}) {
  return !paymentChecked ? (
    <div className="flex flex-col px-6 h-fit pb-4 shadow rounded">
      <div className="flex flex-row items-center py-[26px] text-[1.15rem] text-[#a6a9ae] font-semibold leading-6 fontTech tracking-[-1px]">
        <span className="border-2 border-solid border-[#a6a9ae]  rounded-[50%] w-[28px] h-[28px] flex justify-center mr-3 ">
          2
        </span>
        Delivery details
      </div>
    </div>
  ) : checked ? (
    <div className="flex flex-col px-6 h-fit pb-4 shadow rounded">
      <div className="flex flex-row items-center justify-between py-[26px] text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
        <div className="flex flex-row items-center">
          <span className="border-2 border-solid border-[#009f29] text-[#009f29] rounded-[50%] w-[28px] h-[28px] flex items-center justify-center mr-3 ">
            <MdDone />
          </span>
          Delivery details
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
    <ShipmentForm
      shipment={shipment}
      submit={submit}
      handleChange={handleChange}
      shipmentErrors={shipmentErrors}
      shipmentTouched={shipmentTouched}
    />
  );
}
