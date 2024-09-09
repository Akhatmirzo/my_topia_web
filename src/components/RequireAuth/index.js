import React, { useEffect, useMemo } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import EmployerLayout from "../../layouts/EmployerLayout";
import { receiveData } from "../../socket.io/SocketIo";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tablesApi } from "../../store/api/tablesApi";
import { OrderApi } from "../../store/api/orderApi";

export default function RequireAuth({ AllowedRole }) {
  const dispatch = useDispatch();
  const role = useMemo(() => {
    const role = localStorage.getItem("role");
    return role;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AllowedRole]);

  useEffect(() => {
    // Refresh token update access token
    receiveData("refreshToken", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.reload();
    })
  }, [])

  useEffect(() => {
    // update table
    receiveData("updateTable", (data) => {
      dispatch(
        tablesApi.util.updateQueryData(
          "getTables",
          undefined,
          (draftOrders) => {
            draftOrders.tables = draftOrders.tables.map((table) => {
              if (table._id === data._id) {
                return data;
              } else {
                return table;
              }
            });
          }
        )
      );
    });

    // Create a new order
    receiveData("newOrder", (data) => {
      console.log("New Order received", data);

      dispatch(
        OrderApi.util.updateQueryData(
          "getAllOrders",
          undefined,
          (draftOrders) => {
            draftOrders.orders.push(data.newOrder); // Yangi buyurtmani qo'shish
          }
        )
      );
    });

    // Update an existing order
    receiveData("updateOrder", (data) => {
      dispatch(
        OrderApi.util.updateQueryData(
          "getAllOrders",
          undefined,
          (draftOrders) => {
            draftOrders.orders = draftOrders.orders.map((order) => {
              if (order._id === data._id) {
                return data; // Yangilangan order obyektini qaytaradi
              } else {
                return order; // Aks holda, mavjud orderni qaytaradi
              }
            });
          }
        )
      );
    });

    // Reflresh orders date for client orders
    receiveData("reflesh", () => {
      dispatch(OrderApi.util.invalidateTags(["orders"]));
    });
    
  }, [dispatch]);

  if (AllowedRole && role === AllowedRole) {
    if (AllowedRole === "admin") {
      return <AdminLayout />;
    } else if (AllowedRole === "employer") {
      return <EmployerLayout />;
    } else {
      return <Navigate to={"/login"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
}
