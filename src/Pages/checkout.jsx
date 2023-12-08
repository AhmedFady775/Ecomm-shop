import React from "react";
import CheckoutNav from "../components/checkout/checkout_header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItemsStore, userInfoStore } from "../suztand/Store";
import PaymentSection from "../components/checkout/payment_section";
import ShipmentSection from "../components/checkout/shipment_section";
import ConfirmOrder from "../components/checkout/confirm_order";
import { useFormik } from "formik";
import { shipmentSchema } from "../components/forms/schemas";
import { toast } from "react-toastify";

function Checkout() {
  const navigate = useNavigate();
  const { userInfo } = userInfoStore();
  const { cartItems } = CartItemsStore();
  const [loading, setLoading] = useState(false);

  const {
    values: payment,
    handleSubmit: paymentSubmit,
    handleChange: HandlePaymentChange,
    setFieldValue: setPaymentFieldValue,
  } = useFormik({
    initialValues: {
      paymentMethod: "Delivery",
      checked: false,
    },
    onSubmit: () => {
      setPaymentFieldValue("checked", true);
    },
  });

  const {
    values: shipment,
    errors: shipmentErrors,
    handleSubmit: shipmentSubmit,
    handleChange: HandleShipmentChange,
    touched: shipmentTouched,
    setFieldValue: setShipmentFieldValue,
  } = useFormik({
    initialValues: {
      fullName: userInfo.name,
      address: "",
      city: "",
      zip: "",
      country: "",
      checked: false,
    },
    validationSchema: shipmentSchema,
    onSubmit: () => {
      setShipmentFieldValue("checked", true);
    },
  });

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress: {
            fullName: shipment.fullName,
            address: shipment.address,
            city: shipment.city,
            postalCode: shipment.zip,
            country: shipment.country,
          },
          paymentMethod: payment.paymentMethod,
          itemsPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
          totalPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
          taxPrice: 0,
          shippingPrice: 0,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setLoading(false);
        toast.success("your order successfully been placed.");
        navigate(`/orders/${data.id}`);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <CheckoutNav />
      {/* {formchecked && (
        <OrderModal id={formId} nav="/" open={true} closeFnc={handleClose} />
      )} */}
      <section className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:m-auto pt-[60px] lg:pt-6 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <div className="flex flex-col lg:w-[60%] lg:mr-6 lg:rounded h-fit gap-4">
          <PaymentSection
            checked={payment.checked}
            submit={paymentSubmit}
            edit={() => setPaymentFieldValue("checked", false)}
            payment={payment}
            handleChange={HandlePaymentChange}
          />
          <ShipmentSection
            checked={shipment.checked}
            shipment={shipment}
            shipmentErrors={shipmentErrors}
            shipmentTouched={shipmentTouched}
            submit={shipmentSubmit}
            handleChange={HandleShipmentChange}
            edit={() => setShipmentFieldValue("checked", false)}
            paymentChecked={payment.checked}
          />
        </div>
        <ConfirmOrder
          loading={loading}
          cartItems={cartItems}
          paymentChecked={payment.checked}
          shipmentChecked={shipment.checked}
          placeOrderHandler={placeOrderHandler}
        />
      </section>
    </div>
  );
}

export default Checkout;
