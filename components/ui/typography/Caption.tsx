import React, { FC, ReactNode } from "react";

type CaptionProps = {
  children: ReactNode;
  className?: string;
  bold?: boolean;
};

const CaptionStyles = {
  1: "text-[11px] leading-[15.4px]"
};

const fontWeight = (bold: boolean) => (bold ? "font-bold" : "font-normal");

const Caption: FC<CaptionProps> = ({ children, className, bold = false }) => {
  const CaptionClass = `${CaptionStyles[1]} ${fontWeight(bold)} ${className ? ` ${className}` : ""}`;
  return <p className={CaptionClass}>{children}</p>;
};

export default Caption;
