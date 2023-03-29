import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../redux/Store";

export default function CheckoutRoute({ children }) {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;
  return userInfo && cartItems.length !== 0 ? children : <Navigate to="/" />;
}
