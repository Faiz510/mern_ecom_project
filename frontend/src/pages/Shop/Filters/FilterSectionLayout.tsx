import React, { ReactNode } from "react";

interface FilterSectionLayoutProps {
  title: string;
  children: ReactNode;
}

const FilterSectionLayout: React.FC<FilterSectionLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <div>
      <h4 className="text-2xl font-light font-body my-4">{title}</h4>

      <div className="flex flex-col items-start pl-4 gap-1">{children}</div>
    </div>
  );
};

export default FilterSectionLayout;
