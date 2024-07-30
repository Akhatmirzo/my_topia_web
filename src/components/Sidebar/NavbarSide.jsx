import React from "react";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import images from "../../assets/images";

export default function NavbarSide() {
  return (
    <Navbar fluid>
      <Navbar className="p-0 m-0 sm:p-0">
        <Link to="/">
          <img src={images.Logo} alt="logo" />
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
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>

        <DarkThemeToggle />
      </div>
    </Navbar>
  );
}
