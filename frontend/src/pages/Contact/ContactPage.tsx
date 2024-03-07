import bgBannerImg from "../../assests/img-bg-1.jpg";
import PageBanner from "../../components/PageBanner";
import TrustSection from "../Home/trustSection/TrustSection";

const ContactPage = () => {
  return (
    <main>
      {/* ///////////////////////////////// */}
      <PageBanner bgImg={bgBannerImg} pageTitle={"Contact Page"} />

      <section className="my-20 w-[90vw] mx-auto">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Content */}
          <div className="md:w-1/2 flex justify-center items-center p-8 opacity-85 max-w-2xl">
            <form className="max-w-md mx-auto">
              <h3 className="text-4xl font-semibold mb-4 tracking-wider">
                Contact Us
              </h3>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-custom-primary py-2 rounded-lg text-black font-light"
              >
                Send Now
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={bgBannerImg}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* //////////////// */}
      <TrustSection />
    </main>
  );
};

export default ContactPage;
