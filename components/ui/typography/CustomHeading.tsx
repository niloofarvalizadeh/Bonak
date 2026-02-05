import React, { FC, ReactNode } from "react";

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  className?: string;
  bold?: boolean;
};

const headingStyles = {
  1: "text-[40px] leading-[67.2px]",
  2: "text-[40px] leading-[56px]",
  3: "text-[33px] leading-[46.2px]",
  4: "text-[28px] leading-[39.2px]",
  5: "text-[23px] leading-[32.2px]",
};

const fontWeight = (bold: boolean) => (bold ? "font-bold" : "font-normal");

const CustomHeading: FC<HeadingProps> = ({
  level,
  children,
  className,
  bold = false,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingClass = `${headingStyles[level]} ${fontWeight(bold)} ${className ? ` ${className}` : ""}`;
  return <Tag className={headingClass}>{children}</Tag>;
};

export default CustomHeading;
