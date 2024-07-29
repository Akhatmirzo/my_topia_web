import React from "react";
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
import Home from "./pages/client/Home/Home";
import TableLayouts from "./layouts/TableLayouts";
import FoodsLayout from "./layouts/FoodsLayout";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<MainLayout />}>
          <Route
            index
            element={
              <h1 className="w-full h-[calc(100vh-100px)] flex items-center justify-center text-5xl text-center px-1">
                Please scan the QR code available on the Table
              </h1>
            }
          />

          {/* Table Routes */}
          <Route path="table/:table" element={<TableLayouts />}>
            <Route index element={<Hero />} />

            <Route path="foods/:category_id" element={<FoodsLayout />}>
              <Route index element={<Foods />} />
              <Route path=":food_id" element={<FoodDetails />} />
            </Route>
          </Route>

          {/* Cart Routes */}
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<RequireAuth AllowedRole={"admin"} />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Employer Routes */}
        <Route
          path="/employer"
          element={<RequireAuth AllowedRole={"employer"} />}
        >
          <Route index element={<EmployerDashboard />} />
        </Route>

        {/* Not Page */}
        <Route path="/connection" element={<CheckConnection />} />
      </Routes>
    </>
  );
};

export default App;
