import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  HiChartPie,
  HiInbox,
} from "react-icons/hi";
import { PiPicnicTableBold } from "react-icons/pi";
import SidebarBasic from "../components/Sidebar/SidebarBasic";

export default function EmployerLayout() {
  const location = useLocation();
  const [LinkItems] = useState([
    {
      title: "Dashboard",
      to: "/employer",
      icon: HiChartPie,
      active: true,
    },
    {
      title: "Tables",
      to: "/employer/tables",
      icon: PiPicnicTableBold,
      active: false,
    },
    {
      title: "Orders",
      to: "/employer/orders",
      icon: HiInbox,
      active: false,
    },
  ]);

  const newLinks = useMemo(() => {
    return LinkItems.map((link, i) => {
      if (link.to === location.pathname) {
        return { ...link, active: true };
      } else {
        return { ...link, active: false };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="flex">
      <SidebarBasic LinkItems={newLinks} />
      <div className="flex-grow dark:bg-[#374151] overflow-x-hidden overflow-y-auto p-3 border-t dark:border-l">
        <Outlet />
      </div>
    </div>
  );
}
