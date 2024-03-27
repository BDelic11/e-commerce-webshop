"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//icons
import info from "@/public/icons/info.svg";
import wrench from "@/public/icons/wrench.svg";
import cart from "@/public/icons/cartIcon.svg";
import { usePathname } from "next/navigation";

const links = [
  {
    id: 0,
    icon: info,
    href: "/admin/dashboard",
    label: "Overview",
  },
  {
    id: 1,
    icon: cart,
    href: "/admin/products",
    label: "Products",
  },
  {
    id: 2,
    icon: wrench,
    href: "/admin/settings",
    label: "Settings",
  },
];

const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex md:flex-col md:justify-center md:align-middle md:rounded-md md:py-6 md:px-2">
      {links.map((link) => (
        <li
          key={link.id}
          className={`${
            pathname === link.href ? "md:bg-activeButton" : ""
          } cursor-pointer  md:w-full md:py-2 md:pl-2 md:hover:bg-hoverButton md:hover:duration-300 md:rounded-lg `}
        >
          <Link
            className="md:flex md:flex-row md:justify-start md:align-middle md:gap-2"
            href={link.href}
          >
            <Image src={link.icon} alt="link icon" width={24} height={24} />
            <p>{link.label}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarLinks;
