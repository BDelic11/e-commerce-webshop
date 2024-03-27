import React from "react";

//icons
import cart from "@/public/icons/cartIcon.svg";
// import logo from "@/public/icons/logo.png";
import hamburger from "@/public/icons/hamburgerIcon.svg";
import heart from "@/public/icons/heartIcon.svg";
import user from "@/public/icons/userIcon.svg";
import IconLink from "./ui/icon-link";

const rightIcons = [
  {
    id: 1,
    icon: heart,
    linkTo: "/",
  },
  {
    id: 2,
    icon: cart,
    linkTo: "/",
  },
  {
    id: 3,
    icon: user,
    linkTo: "/",
  },
  {
    id: 4,
    icon: hamburger,
    linkTo: "/",
  },
];

export const Navbar = () => {
  return (
    <nav className=" flex flex-row justify-between align-middle w-auto h-14 h-13 mx-6 mt-6 p-4 bg-softGreen rounded-xl">
      {/* <IconLink linkTo={"/"} icon={logo} /> */}
      <h1 className="text-white font-bold">Icon</h1>
      <div className="flex flex-row gap-2">
        {rightIcons.map((icon) => (
          <IconLink key={icon.id} linkTo={icon.linkTo} icon={icon.icon} />
        ))}
      </div>
    </nav>
  );
};
