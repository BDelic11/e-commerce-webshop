import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChart from "./bar-chart";

const SalesAnalitics = () => {
  return (
    <section className="md:w-2/3 md:h-full">
      <Card className="md:w-full md:h-full  md:p-4 md:m-auto shadow-md">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart />
        </CardContent>
      </Card>
    </section>
  );
};

export default SalesAnalitics;
