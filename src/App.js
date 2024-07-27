import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Burger from "./container/Burger";
import Cart from "./components/Cart";
import FoodDetails from "./container/FoodDetails";
import MainLayout from "./layouts/MainLayout";
import CheckConnection from "./components/NotPage/CheckConnection";

const App = () => {
  const [previousLocation, setPreviousLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/cart") {
      setPreviousLocation(location.pathname);
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Hero />} />
          <Route
            path="/cart"
            element={<Cart previousLocation={previousLocation} />}
          />
          <Route path="/burger" element={<Burger />} />
          <Route path="/foodetails" element={<FoodDetails />} />
        </Route>

        {/* Not Page */}
        <Route path="/connection" element={<CheckConnection />} />
      </Routes>
    </>
  );
};

export default App;
