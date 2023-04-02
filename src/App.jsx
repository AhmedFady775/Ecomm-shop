import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";
const Shop = lazy(() => delay(import("./Pages/Shop")));
const Cart = lazy(() => import("./Pages/Cart"));
const Product = lazy(() => import("./Pages/Product"));
const ProductScreen = lazy(() => import("./Pages/ProductScreen"));
const Checkout = lazy(() => delay(import("./Pages/Checkout/Checkout")));
const Login = lazy(() => import("./Pages/Auth/Login"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const Account = lazy(() => import("./Pages/Customer/Account"));

const OrderHistory = lazy(() => import("./Pages/Customer/OrderHistory"));
const Payments = lazy(() => import("./Pages/Customer/Payments"));
const Returns = lazy(() => import("./Pages/Customer/Returns"));

import CheckoutRoute from "./components/SecureRoutes/CheckoutRoute";

async function delay(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

function App() {
  const location = useLocation();

  if (
    location.pathname === "/checkout" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return (
      <div>
        <Suspense fallback={<LinearProgress />} fallbackMinDurationMs={1500}>
          <Routes>
            <Route
              path="/checkout"
              element={
                <CheckoutRoute>
                  <Checkout />
                </CheckoutRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<LinearProgress />} fallbackMinDurationMs={1500}>
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Shop />} />
          <Route
            path="*"
            element={
              <h1 className="flex justify-center text-3xl lg:w-max-[1184px] lg:w-[1184px] m-auto pt-[60px]">
                404 Page not found.
              </h1>
            }
          />
          <Route path="/customer/account" element={<Account />} />
          <Route path="/customer/myorders" element={<OrderHistory />} />
          <Route path="/customer/returns" element={<Returns />} />
          <Route path="/customer/payments" element={<Payments />} />
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/category/:category" element={<Product />} />
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </div>
  );
}

export default App;
