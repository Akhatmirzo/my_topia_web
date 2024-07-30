import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SidebarBasic({ LinkItems }) {
  return (
    <Sidebar className="h-screen sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          {LinkItems.map((linkItem, index) => (
            <Link key={index} to={linkItem.to}>
              <Sidebar.Item active={linkItem.active} icon={linkItem.icon}>
                {linkItem.title}
              </Sidebar.Item>
            </Link>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
