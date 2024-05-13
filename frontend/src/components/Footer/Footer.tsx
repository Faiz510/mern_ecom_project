import LogoImg from "../../assests/logo.png";
import "./Footer.css";
import ContactInfoCol from "./ContactInfoCol";
import LinkCol from "./LinkCol";
import SocialCol from "./SocialCol";
import CopyrightRow from "./CopyrightRow";

const Footer = () => {
  return (
    <footer className=" px-[10vw] bg-custom-primary relative bottom-0">
      <div className="flex items-center flex-col justify-between gap-4 py-5 md:flex-row">
        <img src={LogoImg} alt="logo Image" className="w-44" />

        <ContactInfoCol />

        <LinkCol />

        <SocialCol />
      </div>
      <CopyrightRow />
    </footer>
  );
};

export default Footer;
