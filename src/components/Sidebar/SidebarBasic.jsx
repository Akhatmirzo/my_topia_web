import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SidebarBasic({ LinkItems }) {
  return (
    <Sidebar className="h-screen sidebar w-max lg:w-auto transition-all duration-300">
      <Sidebar.Items >
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          {LinkItems.map((linkItem, index) => (
            <Link id="sidebarLink" key={index} to={linkItem.to}>
              <Sidebar.Item className="text-xl" active={linkItem.active} icon={linkItem.icon}>
                <span>{linkItem.title}</span>
              </Sidebar.Item>
            </Link>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
