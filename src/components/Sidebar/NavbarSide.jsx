import React from "react";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import images from "../../assets/images";

export default function NavbarSide() {
  return (
    <Navbar fluid>
      <Navbar title={"navbar_side"} className="p-0 m-0 sm:p-0">
        <Link to="/">
          <img src={images.Maytopia_control} alt="logo" />
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
              size="lg"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-3xl">Bonnie Green</span>
            <span className="block truncate text-xl font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item className="text-xl">Dashboard</Dropdown.Item>
          <Dropdown.Item className="text-xl">Settings</Dropdown.Item>
          <Dropdown.Item className="text-xl">Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="text-xl">Sign out</Dropdown.Item>
        </Dropdown>

        <DarkThemeToggle />
      </div>
    </Navbar>
  );
}
