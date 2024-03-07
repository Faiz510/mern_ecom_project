import React from "react";

interface PageBannerProps {
  bgImg: string;
  pageTitle: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ bgImg, pageTitle }) => {
  return (
    <section
      className={`h-[250px] flex items-center justify-center bg-cover bg-bottom `}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div>
        <h2 className="text-4xl font-normal">{pageTitle}</h2>
      </div>
    </section>
  );
};

export default PageBanner;
