import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import "./TrustSection.css";
import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section className="flex flex-col w-full justify-between px-8 gap-4 bg-custom-primary lg:flex-row my-10 py-10 lg:px-10">
      <div className={"icon-box-cl"}>
        <FaShippingFast />

        <div>
          <h3>Fast Delivery</h3>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, esse?
          </span>
        </div>
      </div>

      <div className={"icon-box-cl"}>
        <MdOutlinePayments />
        <div>
          <h3>Save Payment</h3>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, esse?
          </span>
        </div>
      </div>

      <div className={"icon-box-cl"}>
        <BiSupport />
        <div className="">
          <h3>Online Support</h3>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, esse?
          </span>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
