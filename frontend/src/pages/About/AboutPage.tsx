import bgBannerImg from "../../assests/img-bg-1.jpg";
import PageBanner from "../../components/PageBanner";
import TrustSection from "../Home/trustSection/TrustSection";
import Testimonials from "../Home/Testimonials/Testimonials";

const AboutPage = () => {
  return (
    <main>
      {/* ///////////////////////////////// */}
      <PageBanner bgImg={bgBannerImg} pageTitle={"About Page"} />

      <section className="my-20 w-[80vw] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={bgBannerImg}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 flex justify-center items-center p-8 opacity-85">
            <div>
              <h3 className="text-4xl font-semibold  mb-4 tracking-wider">
                About Us
              </h3>
              <p className="text-med tracking-wider">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit dolorem dolore sed odit nesciunt dignissimos tempore
                provident porro repellendus omnis?
              </p>
              <p className="text-med tracking-wider">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit dolorem dolore sed odit nesciunt dignissimos tempore
                provident porro repellendus omnis?
              </p>
              <p className="text-med tracking-wider">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit dolorem dolore sed odit nesciunt dignissimos tempore
                provident porro repellendus omnis?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* //////////////// */}
      <Testimonials />

      {/* //////////////// */}
      <TrustSection />
    </main>
  );
};

export default AboutPage;
