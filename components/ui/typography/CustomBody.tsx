import React, { FC, ReactNode } from "react";

type BodyProps = {
  children: ReactNode;
  className?: string;
  bold?: boolean;
};

const BodyStyles = {
  1: "text-[13px] leading-[18.2px]"
};

const fontWeight = (bold: boolean) => (bold ? "font-bold" : "font-normal");

const CustomBody: FC<BodyProps> = ({ children, className, bold = false }) => {
  const bodyClass = `${BodyStyles[1]} ${fontWeight(bold)} ${className ? ` ${className}` : ""}`;
  return <span className={bodyClass}>{children}</span>;
};

export default CustomBody;
