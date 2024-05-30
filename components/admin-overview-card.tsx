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
      <Card className="w-11/12 p-4 m-auto md:w-72 md:p-4 shadow-md">
        <CardContent>
          <div className="flex flex-row justify-between align-middle">
            <p className="font-medium text-base text-gray-800 pb-2">{label}</p>
            <Image
              className="bg-black w-6 h-6 rounded-full"
              src={icon}
              alt="card icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">
              {price ? "€" : ""} {amount}
            </h2>
            {/* TODO ADD BADGE FOR + OR - (RED OR GREEN) IF SALES ARE UP OR DOWN FROM LAST MONTH */}
            <p className="text-sm text-gray-500">+20% from last month</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminOverviewCard;
