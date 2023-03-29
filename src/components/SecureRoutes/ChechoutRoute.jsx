import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../redux/Store";

export default function ChechoutRoute({ children }) {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;
  console.log(cartItems);
  return userInfo && cartItems.length !== 0 ? children : <Navigate to="/" />;
}
