import { NavLink } from "react-router-dom";

const LinkCol = () => {
  return (
    <div className="flex flex-col justify-start">
      <h4 className="footer-col-h">Our Company</h4>
      <ul className="flex justify-start flex-col gap">
        <li>
          <NavLink to={"/"}> About Us </NavLink>
        </li>
        <li>
          <NavLink to={"/"}> Contact Us </NavLink>
        </li>
        <li>
          <NavLink to={"/"}> Account </NavLink>
        </li>
        <li>
          <NavLink to={"/"}> Privacy Policy </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LinkCol;
