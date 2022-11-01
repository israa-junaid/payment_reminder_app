//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext, useState } from "react";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import { NavLink, useLocation, matchRoutes } from "react-router-dom";

//ICONS
import {
  MdOutlineDashboard,
  MdOutlineAnnouncement,
  MdArticle,
  MdAttachMoney,
  MdHourglassEmpty,
  MdPersonAddAlt1,
  MdOutlineGroups,
  MdContacts,
  MdOutlineLibraryAddCheck,
  MdOutlineInventory2,
  MdCardGiftcard,
  MdOutlineLibraryAdd,
  MdPermContactCalendar,
  MdAccountBox,
  MdBeenhere,
  MdOutlineRequestQuote,
  MdOutlineEventNote,
  MdOutlineSettingsAccessibility,
  MdOutlineShoppingCart,
  MdUploadFile,
  MdAccessTime,
  MdRequestPage,
  MdRule,
  MdOutlineStore,
} from "react-icons/md";

//LOGOS
import logo from "../../images/insignia_text_logo.svg";
import love from "../../images/made-with-love.svg";

import { IoMdLogIn } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import { BsReceiptCutoff } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";

const NavUrl = ({ url, icon, description, dropdownItems }) => {
  const { dropdownStatus, setDropdownStatus } = useState();
  const { nav, setNav } = useContext(NavContext);
  const checkWindowSize = () => {
    if (window.innerWidth < 1024) setNav(!nav);
  };

  const useCurrentPath = () => {
    const location = useLocation();
    let currentPath = location.pathname;
    currentPath = currentPath.substring(1);
    return currentPath;
  };

  return (
    <li className={`${styles.li_navlink}`}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={() => {
          checkWindowSize();
        }}
      >
        {icon}
        <span className={`${styles.li_navlink} whitespace-nowrap p-2 mx-2`}>
          {description}
        </span>
      </NavLink>

      <div
        className={
          useCurrentPath().indexOf(url) > -1 ? `${styles.dropdown}` : "hidden"
        }
      >
        <div className={dropdownItems ? "pb-4" : "hidden"}>
          {dropdownItems
            ? dropdownItems.map((dropdownItems) => (
                <li className={`${styles.dropdown}`}>
                  <NavLink
                    to={`${dropdownItems.url}`}
                    className={({ isActive }) =>
                      isActive ? styles.active : undefined
                    }
                  >
                    {" "}
                    {dropdownItems.icon}
                    <span className={`whitespace-nowrap p-2 mx-2`}>
                      {dropdownItems.description}
                    </span>
                  </NavLink>
                </li>
              ))
            : ""}
        </div>
      </div>
    </li>
  );
};

const NavbarAdmin = ({ navDetails }) => {
  const { nav, setNav } = useContext(NavContext);

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
            url="AD/dashboard"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
          />
          <NavUrl
            url="AD/users"
            icon={<MdOutlineGroups />}
            description="Users"
          />
          {navDetails.leaveManagement && (
            <NavUrl
              url="AD/leave-management"
              icon={<MdArticle />}
              description="Leave Management"
            />
          )}
          {navDetails.attendance && (
            <NavUrl
              url="AD/attendance"
              icon={<MdBeenhere />}
              description="Attendance"
            />
          )}
          {navDetails.rewardSystem && (
            <NavUrl
              url="AD/reward"
              icon={<MdCardGiftcard />}
              description="Reward System"
              dropdownItems={[
                {
                  description: "Employee of the Day",
                  url: "AD/reward/employee-day",
                  icon: <MdContacts />,
                },
                {
                  description: "Employee of the Month",
                  url: "AD/reward/employee-month",
                  icon: <MdPermContactCalendar />,
                },
                {
                  description: "Allotment Rules",
                  url: "AD/reward/allotment-rules",
                  icon: <MdRule />,
                },
                {
                  description: "Custom Allotment",
                  url: "AD/reward/custom-allotment",
                  icon: <MdPersonAddAlt1 />,
                },
                {
                  description: "Redeem Shop",
                  url: "AD/reward/redeem-shop",
                  icon: <MdOutlineShoppingCart />,
                },
                {
                  description: "Redeem Requests",
                  url: "AD/reward/redeem-requests",
                  icon: <MdRequestPage />,
                },
              ]}
            />
          )}

          <NavUrl
            url="AD/inventory"
            icon={<MdOutlineInventory2 />}
            description="Inventory"
            dropdownItems={[
              {
                description: "Inventory Management",
                url: "AD/inventory/inventory-management",
                icon: <MdOutlineLibraryAdd />,
              },
              {
                description: "Inventory Assignment",
                url: "AD/inventory/inventory-assignment",
                icon: <MdOutlineLibraryAddCheck />,
              },
            ]}
          />

          <NavUrl
            url="AD/shifts"
            icon={<MdAccessTime />}
            description="Shifts"
          />
          <NavUrl
            url="AD/requests"
            icon={<MdOutlineAnnouncement />}
            description="Requests & Complains"
          />

          <NavUrl
            url="AD/file-management"
            icon={<MdUploadFile />}
            description="File Management"
          />
          {navDetails.voting && (
            <NavUrl
              url="AD/voting"
              icon={<MdHourglassEmpty />}
              description="Voting"
            />
          )}
          {navDetails.payroll && (
            <NavUrl
              url="AD/payroll"
              icon={<MdAttachMoney />}
              description="Payroll"
              dropdownItems={[
                {
                  description: "Tax Policy",
                  url: "AD/payroll/tax-policy",
                  icon: <MdOutlineEventNote />,
                },
                {
                  description: "Grades",
                  url: "AD/payroll/grades",
                  icon: <MdOutlineSettingsAccessibility />,
                },
                {
                  description: "Salary",
                  url: "AD/payroll/salary",
                  icon: <MdOutlineRequestQuote />,
                },
              ]}
            />
          )}
          <NavUrl
            url="AD/profile"
            icon={<MdAccountBox />}
            description="Profile"
          />
          <NavUrl
            url="AD/office-details"
            icon={<MdOutlineStore />}
            description="Office Details"
          />
          {/* <NavUrl
            url="AD/dishes"
            icon={<MdOutlinedFlag />}
            description="Dishes"
          /> */}
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

export default NavbarAdmin;
