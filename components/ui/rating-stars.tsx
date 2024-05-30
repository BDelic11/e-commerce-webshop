import React from "react";
import Image from "next/image";

// Icons
import starFilled from "@/public/icons/pencil.svg";
import starEmpty from "@/public/icons/starIcon.svg";

interface RatingStarsProps {
  rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? 1 : 0
  );

  return (
    <section>
      <div className="flex flex-row gap-1 justify-center align-middle">
        {stars.map((star, index) => (
          <Image
            key={index}
            height={20}
            width={20}
            alt="star"
            src={star === 1 ? starFilled : starEmpty}
          />
        ))}
      </div>
    </section>
  );
};

export default RatingStars;
