import React from "react";
import { Navigate } from "react-router-dom";
import { CartItemsStore, userInfoStore } from "../../suztand/Store";

export default function CheckoutRoute({ children }) {
  const { cartItems } = CartItemsStore();
  const { userInfo } = userInfoStore();

  return userInfo && cartItems.length !== 0 ? children : <Navigate to="/" />;
}
