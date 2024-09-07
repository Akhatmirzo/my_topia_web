import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./pages/client/Hero";
import Cart from "./pages/client/Cart";
import FoodDetails from "./pages/client/FoodDetails";
import MainLayout from "./layouts/MainLayout";
import CheckConnection from "./pages/NotPage/CheckConnection";
import Foods from "./pages/client/Foods";
import AdminDashboard from "./pages/admin/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import RequireAuth from "./components/RequireAuth";
import TableLayouts from "./layouts/TableLayouts";
import FoodsLayout from "./layouts/FoodsLayout";
import Login from "./pages/auth/Login";
import Employers from "./pages/admin/Employers";
import Categories from "./pages/admin/Categories";
import Orders from "./common/Orders";
import FoodsAdmin from "./common/Foods";
import Tables from "./common/Tables";
import { disconnect, isConnected } from "./socket.io/SocketIo";
import ClientOrder from "./pages/client/Orders"
import EmployerCart from "./pages/employer/EmployerCart";

const App = () => {
  useEffect(() => {
    localStorage.setItem("flowbite-theme-mode", "dark");
  }, []);

  isConnected();
  disconnect();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <h1 className="w-full h-[calc(100vh-100px)] flex items-center justify-center text-5xl text-center px-1 mysm:text-2xl">
                Please scan the QR code available on the Table
              </h1>
            }
          />

          <Route path="orders" element={<ClientOrder role={"client"} />} />

          {/* Table Routes */}
          <Route path="table/:table" element={<TableLayouts />}>
            <Route index element={<Hero />} />

            <Route path="foods/:category_id" element={<FoodsLayout />}>
              <Route index element={<Foods />} />
              <Route path=":food_id" element={<FoodDetails />} />
            </Route>

            {/* Cart Routes */}
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<RequireAuth AllowedRole={"admin"} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="employers" element={<Employers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tables" element={<Tables />} />
          <Route path="orders" element={<Orders role={"admin"} />} />
          <Route path="foods" element={<FoodsAdmin />} />
        </Route>

        {/* Employer Routes */}
        <Route
          path="/employer"
          element={<RequireAuth AllowedRole={"employer"} />}
        >
          <Route index element={<EmployerDashboard />} />
          <Route path="tables" element={<Tables />} />
          <Route path="orders" element={<Orders role={"employer"} />} />
          <Route path="cart" element={<EmployerCart />} />
        </Route>

        {/* Not Page */}
        <Route path="/connection" element={<CheckConnection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
