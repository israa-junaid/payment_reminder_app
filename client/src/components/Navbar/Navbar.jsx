//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext } from "react";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import { NavLink, useNavigate } from "react-router-dom";

//ICONS
import {
  MdOutlineDashboard,
  MdOutlineStore,
  MdOutlineAnnouncement,
} from "react-icons/md";

//LOGOS
import logo from "../../images/insignia_text_logo.svg";
import love from "../../images/made-with-love.svg";

import { IoMdLogIn } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";

const NavUrl = ({ url, icon, description }) => {
  const { nav, setNav } = useContext(NavContext);
  const checkWindowSize = () => {
    if (window.innerWidth < 1024) setNav(!nav);
  };

  return (
    <li className={`${styles.li_navlink}`}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={() => checkWindowSize()}
      >
        {icon}
        <span className={`${styles.li_navlink} whitespace-nowrap p-2 mx-2`}>
          {description}
        </span>
      </NavLink>
    </li>
  );
};

const Navbar = () => {
  const { nav, setNav } = useContext(NavContext);
  let navigate = useNavigate();
  console.log("inside su navbar")
  return (
    <div
      className={`${styles.navbar_container}  ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav className={nav ? undefined : styles.nav_small}>
        {/* LOGO */}
        <div className={styles.logo}>
          <img className="h-24 m-auto" src={logo} alt="" />
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={`${styles.menu_container}`}>
          {/* FIRST CATEGORY */}
          {/* <span className={styles.categories}>
            {nav ? "Pages" : <BsThreeDots />}
          </span> */}

          <NavUrl
            url="payment/dashboard"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
          />

          <NavUrl
            url="payment/offices"
            onClick={() => navigate("/payment/offices/all-offices")}
            icon={<MdOutlineStore />}
            description="Offices"
          />
          <NavUrl
            url="payment/complains"
            icon={<MdOutlineAnnouncement />}
            description="Complains"
          />

          {/* SECOND CATEGORY */}
          {/* <span className={`${styles.categories} ${styles.second_category}`}>
            {nav ? "More" : <BsThreeDots />}
          </span> */}

          {/* <NavUrl
            url="other1"
            icon={<IoMdLogIn />}
            description="Authentication"
          />
          <NavUrl url="other2" icon={<FaReact />} description="ReactJs" /> */}
        </ul>

        {/* MADE WITH LOVE */}
        <div className={nav ? styles.made_love : styles.made_love_hidden}>
          <img src={love} alt="" />
        </div>
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  );
};

export default Navbar;
