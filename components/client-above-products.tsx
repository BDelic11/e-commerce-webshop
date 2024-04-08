"use client";
import React, { useState } from "react";

import Image from "next/image";

//icons
import filter from "@/public/icons/settings vertical.svg";

interface AboveProductsClientContainerProps {
  lenght: number;
  toggleFilter: boolean;
  setToggleFilter: (bool: boolean) => void;
}

const AboveProductsClientContainer = ({
  lenght,
  toggleFilter,
  setToggleFilter,
}: AboveProductsClientContainerProps) => {
  return (
    <>
      <div className=" flex flex-row w-full justify-between align-middle pt-6 px-4 md:pt-10 md:px-24 ">
        <h1 className="md:px-3 text-lg font-medium md:text-2xl md:font-medium ">{`Svi proizvodi (${lenght})`}</h1>
        <div className=" flex-row justify-end gap-2 md:gap-2 align-middle md:p-2 rounded-full md:hover:bg-gray-100 cursor-pointer hidden md:flex">
          {toggleFilter ? (
            <p
              onClick={() => setToggleFilter(false)}
              className="m-auto text-sm md:text-base "
            >
              Close Filters
            </p>
          ) : (
            <p
              onClick={() => setToggleFilter(true)}
              className="m-auto text-sm md:text-base"
            >
              Show Filters
            </p>
          )}

          <Image src={filter} alt="filter icon" width={24} height={24} />
        </div>
      </div>
    </>
  );
};

export default AboveProductsClientContainer;
