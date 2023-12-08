import React from "react";
import FormInput from "./form_input";

export default function ShipmentForm({
  shipment,
  handleChange,
  submit,
  shipmentErrors,
  shipmentTouched,
}) {
  return (
    <div className="flex flex-col px-6 h-fit pb-4 shadow rounded">
      <div className="flex flex-row items-center py-[26px] text-[1.15rem] font-semibold leading-6 tracking-[-1px]">
        <span className="border-2 border-solid border-[#0e001a] rounded-[50%] w-[28px] h-[28px] flex justify-center mr-3 ">
          2
        </span>
        Delivery details
      </div>
      <form className="flex flex-col w-full gap-4" onSubmit={submit}>
        <FormInput
          placeHolder="full name"
          name="fullName"
          type="text"
          onChange={handleChange}
          value={shipment.fullName}
          error={shipmentErrors.fullName}
          touched={shipmentTouched.fullName}
          required
        />
        <FormInput
          placeHolder="address"
          name="address"
          type="text"
          onChange={handleChange}
          value={shipment.address}
          error={shipmentErrors.address}
          touched={shipmentTouched.address}
          required
        />
        <FormInput
          placeHolder="city"
          name="city"
          type="text"
          onChange={handleChange}
          value={shipment.city}
          error={shipmentErrors.city}
          touched={shipmentTouched.city}
          required
        />
        <FormInput
          placeHolder="zip code"
          name="zip"
          type="text"
          onChange={handleChange}
          value={shipment.zip}
          error={shipmentErrors.zip}
          touched={shipmentTouched.zip}
          required
        />
        <FormInput
          placeHolder="country"
          name="country"
          type="text"
          onChange={handleChange}
          value={shipment.country}
          error={shipmentErrors.country}
          touched={shipmentTouched.country}
          required
        />
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
