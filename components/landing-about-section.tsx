"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

// images
import OwnerImage from "@/public/images/businessWomanTransparent.png";

const LandingAboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section className=" flex flex-col md:items-center  md:px-60 py-10 md:py-40 h-fit w-full px-6 bg-landingBackground">
      <div className="md:translate-y-10">
        <h1
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className=" font-lora text-4xl md:text-6xl mb-10 md:pl-20 md:mb-20 md:font-medium  "
        >
          Naša Priča
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center md:py-10 md:bg-inherit md:px-10 md:rounded-xl  ">
          <div
            ref={ref}
            style={{
              transform: isInView ? "none" : "translateX(-200px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
            }}
            className="md:w-full "
          >
            <Image
              src={OwnerImage}
              alt="About us image of a founder"
              className=" object-cover h-60 w-60 md:h-80 md:w-80 m-auto md:m-0 my-10"
            />
          </div>
          <div
            ref={ref}
            style={{
              transform: isInView ? "none" : "translateX(-200px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            className="flex flex-col gap-4 md:gap-2 w-full "
          >
            <p className=" font-roboto_slab leading-relaxed text-base">
              Dobrodošli u naš svijet gdje svaki detalj priča priču ljubavi i
              mašte! U Kutku čarolija svaki komad je ručno izrađen s neizmjernom
              pažnjom i ljubavlju, odražavajući duh blagdana koji nas sve
              okuplja. Naša misija je donijeti{" "}
              <span className="font-lora font-bold text-accentRed">
                toplinu i radost
              </span>{" "}
              vašem domu kroz jedinstvene božićne vijence, čarobne božićne
              vilinjake, te raskošne uskrsne dekoracije.
            </p>
            {/* <Image
            src={OwnerImage}
            alt="About us image of a founder"
            className=" object-cover h-60 w-60 m-auto my-10"
          /> */}
            <p>
              Osnovani iz strasti prema kreiranju i želje za širenjem sreće,
              naši proizvodi su više od običnih ukrasa – oni su simboli topline
              doma i radosti zajedništva.
            </p>
            <p>
              Svaki proizvod u našem asortimanu je{" "}
              <span className="font-lora font-bold text-accentRed">
                unikatan
              </span>{" "}
              , napravljen s puno strpljenja i kreativnosti, osmišljen da unese
              čaroliju u vaše posebne trenutke.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAboutSection;
