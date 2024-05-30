"use client";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface LandingIconTextContainerProps {
  icon?: StaticImageData;
  text: string;
  className?: string;
}

const LandingIconTextContainer = ({
  icon,
  text,
  className,
}: LandingIconTextContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <article
      className={` ${className} flex flex-col items-center gap-2 md:gap-6 md:m-auto md:align-middle md:justify-center md:bg-inherit md:px-10 md:py-6 md:rounded-lg
                transition-all duration-500 delay-75 transform md:hover:scale-110 `}
      //  md:shadow md:shadow-black "
    >
      {/* <div className="">
        <Image
          src={icon}
          alt={`Image of ${text}`}
          className="w-20 h-20 md:w-20 md:h-20 lg:w-32 lg:h-32 "
        />
      </div> */}
      <h2
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
        className=" font-roboto_slab  "
      >
        {text}
      </h2>
    </article>
  );
};

export default LandingIconTextContainer;
