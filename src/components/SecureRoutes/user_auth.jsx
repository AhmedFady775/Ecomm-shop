import React from "react";
import { Navigate } from "react-router-dom";
import { userInfoStore } from "../../suztand/Store";

export default function UserProtectedRoute({ children }) {
  const { userInfo } = userInfoStore();
  return userInfo ? children : <Navigate to="/" />;
}
