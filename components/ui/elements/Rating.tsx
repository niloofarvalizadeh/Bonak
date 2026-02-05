import React from "react";

import { Star1 } from "iconsax-react";
import { Rating as ReactRating } from "@smastrom/react-rating";

type RatingProps = {
  rating: number;
  starColor?: string;
  single?: boolean;
  className?: string;
  size: number;
};
const Rating = ({
  rating,
  starColor = "#ffc107",
  single = false,
  className,
  size
}: RatingProps) => {
  if (single) {
    return <Star1 color={starColor} size={size} className={`${className}`} />;
  }
  return [1, 2, 3, 4, 5]?.map((index) => (
    <Star1
      key={index}
      color={index <= rating ? starColor : "#E4E5E9"}
      variant={index <= rating ? "Outline" : "Outline"}
      size={size}
      className={`size-6 ${className}`}
    />
  ));
};

export default Rating;

type StarRatingProps = {
  rating: number;
  starColor?: string;
  className?: string;
  size?: number;
};

const StarRating = ({
  rating,
  starColor = "#ffc107",
  className,
  size = 24
}: StarRatingProps) => {
  return (
    <ReactRating
      value={rating}
      readOnly // اگر نمی‌خواهید کاربر بتواند امتیاز را تغییر دهد
      style={{ color: starColor, fontSize: size }} // استایل‌دهی
      className={className}
    />
  );
};

export { StarRating };
