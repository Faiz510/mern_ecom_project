import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";

const SocialCol = () => {
  return (
    <div>
      <h3 className="footer-col-h">Social Links</h3>

      <div className="socail-icons flex justify-center items-center gap-3">
        <a href="https://www.facebook.com">
          <FaFacebookSquare />
        </a>

        <a href="https://www.twitter.com">
          <FaTwitterSquare />
        </a>

        <a href="https://www.instagram.com">
          <FaInstagramSquare />
        </a>

        <a href="https://www.linkedin.com">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default SocialCol;
