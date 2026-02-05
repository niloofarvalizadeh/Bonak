import React, { FC, ReactNode } from "react";

type TitleProps = {
  level: 1 | 2;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bold?: boolean;
};

const TitleStyles = {
  1: "text-[19px] leading-[26.6px]",
  2: "text-[16px] leading-[22.4px]"
};

const fontWeight = (bold: boolean) => (bold ? "font-bold" : "font-normal");

const Title: FC<TitleProps> = ({
  level,
  children,
  className,
  style,
  bold = false
}) => {
  const titleClass = `${TitleStyles[level]} ${fontWeight(bold)} ${className ? ` ${className}` : ""}`;
  return (
    <h1 className={titleClass} style={style}>
      {children}
    </h1>
  );
};

export default Title;
