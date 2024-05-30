"use client";
import { StaticImageData } from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

// Icons
import uniqueIcon from "@/public/icons/why-choose-us/uniqueIcon.svg";
import handmadeIcon from "@/public/icons/why-choose-us/handmadeIcon.svg";
import LandingIconTextContainer from "./landing-icon-text-container";

interface Icon {
  id: number;
  icon: StaticImageData;
  text: string;
  className?: string;
}

const ListOfIcons: Icon[] = [
  {
    id: 1,
    icon: handmadeIcon,
    text: "Ručna izrada",
    className: "text-accentRed text-4xl  translate-y-6",
  },

  {
    id: 2,
    icon: uniqueIcon,
    text: "Unikatnost",
    className: "text-gray-900 text-6xl font-thin",
  },
  {
    id: 3,
    icon: uniqueIcon,
    text: "Jedinstvenost",
    className: "text-softGreen text-4xl font-bold md:translate-y-10",
  },
  {
    id: 4,
    icon: uniqueIcon,
    text: "Toplina",
    className:
      " font-medium text-5xl text-gray-900 md:translate-x-20 md:translate-y-10  ",
  },
  {
    id: 5,
    icon: uniqueIcon,
    text: "Napravljeno s ljubavlju",
    className:
      "text-accentRed text-4xl md:translate-x-20  md:translate-y-10 md:text-nowrap",
  },
  // { id: 6, icon: uniqueIcon, text: "Unikatnost", className: "" },
];

const LandingWhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className="flex flex-col h-max w-full px-6 py-20  md:px-20 md:pt-60 md:pb-40  bg-landingBackground     
      "
    >
      <center>
        <h1
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="font-lora text-4xl md:text-5xl md:font-thin mb-20  text-gray-900 "
        >
          {" "}
          Po čemu smo mi
          <span className="text-5xl md:text-6xl font-semibold md:text-softGreen">
            {" "}
            Drugačiji
          </span>{" "}
          ?
        </h1>
      </center>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-y-20 text-wrap gap-20 md:gap-10 my-10 md:my-32">
        {ListOfIcons.map((icon) => (
          <LandingIconTextContainer
            key={icon.id}
            icon={icon.icon}
            text={icon.text}
            className={icon.className}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingWhyChooseUsSection;
