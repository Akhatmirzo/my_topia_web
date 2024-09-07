import React from "react";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { useDispatch } from "react-redux";
import {
  toggleSidebar,
} from "../../store/slices/SidebarSlice";

export default function NavbarSide() {
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  const handleIsOpenToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Navbar fluid>
      <Navbar title={"navbar_side"} className="p-0 m-0 sm:p-0">
        <Link>
          <img
            src={images.Maytopia_control}
            alt="logo"
            onClick={handleIsOpenToggle}
          />
        </Link>
      </Navbar>
      <div className="flex gap-5 md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
              size="md"
            />
          }
        >
          <Dropdown.Header>
            <span className="w-[200px] block text-2xl capitalize">{role}</span>
          </Dropdown.Header>
          <Dropdown.Item className="text-xl">Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="text-xl"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>

        <DarkThemeToggle />
      </div>
    </Navbar>
  );
}
