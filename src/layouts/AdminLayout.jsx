import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarBasic from "../components/Sidebar/SidebarBasic";
import NavbarSide from "../components/Sidebar/NavbarSide";
import {
  HiChartPie,
  HiInbox,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { PiPicnicTableBold } from "react-icons/pi";

export default function AdminLayout() {
  const location = useLocation()
  const [LinkItems] = useState([
    {
      title: "Dashboard",
      to: "/admin",
      icon: HiChartPie,
      active: true,
    },
    {
      title: "Employers",
      to: "/admin/employers",
      icon: HiUser,
      active: false,
    },
    {
      title: "Categories",
      to: "/admin/categories",
      icon: HiViewBoards,
      active: false,
    },
    {
      title: "Tables",
      to: "/admin/tables",
      icon: PiPicnicTableBold,
      active: false,
    },
    {
      title: "Orders",
      to: "/admin/orders",
      icon: HiInbox,
      active: false,
    },
    {
      title: "Foods",
      to: "/admin/foods",
      icon: HiTable,
      active: false,
    },
  ])

  const newLinks = useMemo(() => {
    return LinkItems.map((link, i) => {
      if (link.to === location.pathname) {
        return {...link, active: true }
      } else {
        return {...link, active: false }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SidebarBasic role={"admin"} LinkItems={newLinks} />
      <div className="flex-grow">
        <NavbarSide />
        <div className="dark:bg-[#374151] w-full h-[calc(100vh-66px)] overflow-x-hidden overflow-y-auto p-3 border-t dark:border-l relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
