import CustomHeading from "@/components/ui/typography/CustomHeading";
import React, { FC, ReactNode } from "react";

interface DashboardPageTitleProps {
  children: ReactNode;
  className?: string;
}

const DashboardPageTitle: FC<DashboardPageTitleProps> = ({
  className,
  children
}) => {
  return (
    <>
      <CustomHeading
        level={3}
        bold
        className={`hidden text-brand-blue-normal lg:block ${className}`}
      >
        {children}
      </CustomHeading>
      <CustomHeading
        level={5}
        bold
        className={`text-brand-blue-normal lg:hidden ${className}`}
      >
        {children}
      </CustomHeading>
    </>
  );
};

export default DashboardPageTitle;
