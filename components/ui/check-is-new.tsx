import React, { useEffect, useState } from "react";
import { Badge } from "./badge";

const CheckIsNew = ({ creationDate }: { creationDate: Date }) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const differenceInMilliseconds =
      currentDate.getTime() - creationDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

    setIsNew(differenceInDays < 30);
  }, [creationDate]); // Dependency on product.createdAt to re-run this effect if product changes

  return (
    <div>
      {isNew && (
        <Badge
          className="border-accentRed border-2 text-accentRed"
          variant={"outline"}
        >
          Novo
        </Badge>
      )}
      {/* Other JSX */}
    </div>
  );
};

export default CheckIsNew;
