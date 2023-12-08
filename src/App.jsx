import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar/navbar";
const Shop = lazy(() => delay(import("./Pages/shop")));
const Cart = lazy(() => import("./Pages/cart"));
const Product = lazy(() => import("./Pages/products/product"));
const ProductScreen = lazy(() => import("./Pages/products/productScreen"));
const Checkout = lazy(() => delay(import("./Pages/checkout")));
const Login = lazy(() => import("./Pages/Auth/login"));
const Register = lazy(() => import("./Pages/Auth/register"));
const Account = lazy(() => import("./Pages/Customer/Account"));
const Dashboard = lazy(() => import("../src/Pages/Admin/Dashboard"));
const Orders = lazy(() => import("./Pages/Admin/Orders"));
const Products = lazy(() => import("./Pages/Admin/Products"));
const Users = lazy(() => import("./Pages/Admin/Users"));
const OrderHistory = lazy(() => import("./Pages/Customer/OrderHistory"));
const Payments = lazy(() => import("./Pages/Customer/Payments"));
const Returns = lazy(() => import("./Pages/Customer/Returns"));
const CreateProducts = lazy(() =>
  import("./Pages/Admin/Products/CreateProducts")
);
const EditProducts = lazy(() => import("./Pages/Admin/Products/EditProducts"));
const OrderReceipt = lazy(() => import("./Pages/order_receipt"));

import CheckoutRoute from "./components/SecureRoutes/checkout_auth";
import UserProtectedRoute from "./components/SecureRoutes/user_auth";
import AdminNav from "./Pages/Admin/AdminNav";
import Home from "./Pages/home";

async function delay(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

function App() {
  const location = useLocation();

  if (
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/orders" ||
    location.pathname === "/admin/products" ||
    location.pathname === "/admin/users" ||
    location.pathname === "/admin/products/create" ||
    location.pathname === "/admin/products/edit"
  ) {
    return (
      <div className="flex flex-row bg-[#f7f6f6]">
        <AdminNav />
        <Suspense fallback={<LinearProgress />} fallbackMinDurationMs={1500}>
          <Routes>
            <Route path="/admin/products/create" element={<CreateProducts />} />
            <Route path="/admin/products/edit" element={<EditProducts />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/users" element={<Users />} />
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<LinearProgress />}>
        {location.pathname === "/checkout" ||
        location.pathname === "/login" ||
        location.pathname === "/register" ? null : (
          <Navbar />
        )}
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <h1 className="flex justify-center text-3xl lg:w-max-[1184px] lg:w-[1184px] m-auto pt-[60px]">
                <span className="font-bold mr-2">404</span>
                Page not found.
              </h1>
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutRoute>
                <Checkout />
              </CheckoutRoute>
            }
          />
          <Route path="/orders/:id" element={<OrderReceipt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/customer/account"
            element={
              <UserProtectedRoute>
                <Account />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/customer/myorders"
            element={
              <UserProtectedRoute>
                <OrderHistory />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/customer/returns"
            element={
              <UserProtectedRoute>
                <Returns />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/customer/payments"
            element={
              <UserProtectedRoute>
                <Payments />
              </UserProtectedRoute>
            }
          />
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/category/:category" element={<Product />} />
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </div>
  );
}

export default App;
