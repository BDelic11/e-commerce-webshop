"use client";
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
    classname: "",
  },
  {
    id: 2,
    icon: cart,
    linkTo: "/cart",
    classname: "",
    cart,
  },

  {
    id: 3,
    icon: user,
    linkTo: "/profile",
    classname: "",
  },

  {
    id: 4,
    icon: hamburger,
    linkTo: "/",
    classname: "md:hidden",
  },
];
const desktopIcons = [
  // {
  //   id: 1,
  //   label: "New & Featured",
  //   linkTo: "/",
  //   classname: "",
  // },
  {
    id: 1,
    label: "Početna",
    linkTo: "/",
    classname: "",
  },
  {
    id: 2,
    label: "Božicno",
    linkTo: "/products",
    classname: "",
  },
  // {
  //   id: 3,
  //   label: "Uskrs",
  //   linkTo: "/products/easter",
  //   classname: "",
  // },
  {
    id: 3,
    label: "Popust",
    linkTo: "/",
    classname: "",
  },
];

export const Navbar = () => {
  // const initialNavbarClass =
  //   "sticky top-0 flex flex-row justify-between items-center w-auto h-16  mx-4 mt-6 p-4 bg-softGreen rounded-xl md:h-20";

  // const stickyNavbarClass =
  //   "sticky top-0 flex flex-row justify-between items-center w-full h-16  p-4 bg-softGreen rounded-none md:h-20 ";
  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= 0) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <nav
      // className={`${
      //   isSticky ? stickyNavbarClass : initialNavbarClass
      // } duration-100 delay-75 z-10 md:px-20 `}
      className=" font-roboto_slab lg:text-lg sticky top-0 flex flex-row justify-between items-center w-full h-16 p-4 bg-softGreen rounded-none md:h-20 duration-100 delay-75 z-10 md:px-20 "
    >
      <IconLink icon={heart} linkTo="/" />

      <ul className="hidden md:flex flex-row gap-3 md:gap-6 lg:gap-12 my-auto ">
        {desktopIcons.map((icon) => (
          <IconLink
            underline
            key={icon.id}
            classname={icon.classname}
            linkTo={icon.linkTo}
            label={icon.label}
          />
        ))}
      </ul>

      <ul className="flex flex-row gap-4 md:gap-4 lg:gap-5 my-auto">
        {rightIcons.map((icon) => (
          <IconLink
            hover
            key={icon.id}
            classname={icon.classname}
            linkTo={icon.linkTo}
            icon={icon.icon}
            cart={icon.cart}
          />
        ))}
      </ul>
    </nav>
  );
};
