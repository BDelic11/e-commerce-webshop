import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface IconLinkProps {
  hover?: boolean;
  underline?: boolean;
  linkTo: string;
  icon?: StaticImageData;
  label?: string;
  classname?: string;
  cart?: boolean;
}

const IconLink = ({
  underline,
  hover,
  linkTo,
  icon,
  classname,
  label,
  cart,
}: IconLinkProps) => {
  return (
    <Link
      href={linkTo}
      className={`${
        hover ? "md:hover:bg-hoverSoftGreen rounded-full duration-300" : ""
      } 
      ${
        underline
          ? " hover:underline  underline-offset-[16px]  decoration-navbarTextColor decoration-2 transition-all duration-300 delay-300"
          : ""
      }
       ${classname} md:p-1  `}
    >
      {icon ? (
        <li className="relative list-none">
          {cart ? (
            <div className=" w-2 h-2 absolute right-0 top-0 rounded-full bg-red-500"></div>
          ) : (
            <></>
          )}
          <Image
            src={icon}
            alt="Link icon"
            className="w-6 h-6 text-red-100 md:w-7 md:h-7 relative"
            // width={24}
            // height={24}
          />
        </li>
      ) : (
        <li className="text-navbarTextColor font-light">{label}</li>
      )}
    </Link>
  );
};

export default IconLink;
