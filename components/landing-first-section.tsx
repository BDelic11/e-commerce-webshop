import Image from "next/image";

// images
import LandingFirstSectionImage from "@/public/images/landingImage.svg";
import Link from "next/link";

const LandingFirstSection = () => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:px-60 h-screen w-full pt-20 md:pt-0  bg-landingBackground">
      <div className="pl-6  ">
        <h1 className="font-lora text-5xl md:text-6xl pb-5">
          <span className=" block pb-3 ">S Ljubavlju,</span> Za Tvoj{" "}
          <span className=" font-semibold lg:font-bold lg:text-accentRed">
            Dom
          </span>
        </h1>
        <p className=" font-roboto_slab w-2/3 text-wrap md:text-lg">
          otkrijte paletu unikatnih i ručno izrađenih dekoracija, stvorenih da
          unesu toplinu u vaš dom.
        </p>
        <Link
          className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
   tracking-wider my-10 bg-accentRed text-primary-foreground hover:bg-accentRed/90 md:h-12 md:px-6 md:py-4 md:my-32 md:text-lg"
          href={"/products"}
        >
          Naruči odmah
        </Link>
      </div>
      <div className=" md:w-2/3 md:h-2/3 ">
        <Image
          src={LandingFirstSectionImage}
          alt="first section image of christmas decor"
          className=" border-none object-contain items-center w-full h-full "
        />
      </div>
    </section>
  );
};

export default LandingFirstSection;
