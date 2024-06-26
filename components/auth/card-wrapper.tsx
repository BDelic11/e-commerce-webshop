"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Social from "./social";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  cardDescription?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  classname?: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  cardDescription,
  backButtonHref,
  backButtonLabel,
  showSocial,
  classname,
}: CardWrapperProps) => {
  return (
    <Card className={`${classname} w-full  md:shadow-lg `}>
      <CardHeader>
        <CardTitle className=" text-center py-4">{headerLabel}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        {backButtonLabel && backButtonHref ? (
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          ></BackButton>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
