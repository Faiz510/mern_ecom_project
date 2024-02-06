import { MdOutlineMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const ContactInfoCol = () => {
  return (
    <div className="">
      <h3 className="footer-col-h">Contact Info</h3>

      <div className="contact-info-inner-cl">
        <FaLocationDot />

        <span className="">
          Address : Dash Country , Dash city , 123 street
        </span>
      </div>
      <div className="contact-info-inner-cl">
        <FaPhoneAlt />
        <span>Phone : +123 456 789</span>
      </div>
      <div className="contact-info-inner-cl">
        <MdOutlineMail />
        <span>Email : test@gmail.com</span>
      </div>
    </div>
  );
};

export default ContactInfoCol;
