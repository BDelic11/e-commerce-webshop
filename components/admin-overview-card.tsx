import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

interface AdminOverviewCardProps {
  label: string;
  icon: StaticImageData;
  amount: number;
  price?: boolean;
}

const AdminOverviewCard = ({
  label,
  icon,
  amount,
  price,
}: AdminOverviewCardProps) => {
  return (
    <section>
      <Card className="md:w-72 md:p-4 md:m-auto shadow-md">
        <CardContent>
          <div className="md:flex md:flex-row md:justify-between md:align-middle">
            <p className="md:font-medium text-base text-gray-800 pb-2">
              {label}
            </p>
            <Image
              className="bg-black w-6 h-6 rounded-full"
              src={icon}
              alt="card icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <h2 className="md:font-bold md:text-lg">
              {price ? "€" : ""} {amount}
            </h2>
            {/* TODO ADD BADGE FOR + OR - (RED OR GREEN) IF SALES ARE UP OR DOWN FROM LAST MONTH */}
            <p className="md:text-sm md:text-gray-500">+20% from last month</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminOverviewCard;
