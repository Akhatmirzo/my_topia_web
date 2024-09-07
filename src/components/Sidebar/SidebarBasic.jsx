import React, { useMemo } from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/SidebarSlice";

export default function SidebarBasic({ LinkItems, role }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebarSlice.isOpen);
  const styles = useMemo(() => {
    return role === "admin"
      ? {
          top: "66px",
          left: isOpen ? "0" : "-100%",
          zIndex: isOpen && role === "admin" ? "9999999999" : "",
        }
      : {};
  }, [role, isOpen]);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Sidebar
      style={styles}
      className={`absolute lg:static ${
        role === "admin" ? "h-[calc(100vh-66px)] lg:h-screen" : "h-screen"
      } sidebar w-max lg:w-auto transition-all duration-300`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          {LinkItems.map((linkItem, index) => (
            <Link
              id="sidebarLink"
              key={index}
              to={linkItem.to}
              onClick={handleToggle}
            >
              <Sidebar.Item
                className="text-xl"
                active={linkItem.active}
                icon={linkItem.icon}
              >
                <span>{linkItem.title}</span>
              </Sidebar.Item>
            </Link>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
