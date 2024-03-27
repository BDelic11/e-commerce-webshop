import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface IconLinkProps {
  linkTo: string;
  icon: StaticImageData;
}

const IconLink = ({ linkTo, icon }: IconLinkProps) => {
  return (
    <Link href={linkTo}>
      <Image src={icon} alt="Link icon" width={20} height={20} />
    </Link>
  );
};

export default IconLink;
