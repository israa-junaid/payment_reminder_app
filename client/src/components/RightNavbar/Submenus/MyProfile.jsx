//REACT ROUTER
import { Link } from "react-router-dom";

//HOOKS
import useClickOutside from "../../../CustomHooks/ClickOutside";
import { useState } from "react";

//ICONS , PICS , STYLES
import styles from "./MyProfile.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import profile from "../../../images/table/default_profile.svg";
import { ReactComponent as Avatar } from "../../../pics/avatar.svg";

const MyProfile = () => {
  const [isProfileOpen, setisProfileOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisProfileOpen(false);
  });
  return (
    <div
      ref={domNode}
      className={`${styles.avatar_container} `}
      onClick={() => {
        setisProfileOpen(!isProfileOpen);
      }}
    >
      {/* NAME */}
      <div className={`${styles.name}`}>
        <span className="md:whitespace-nowrap mx-2">
          {localStorage.getItem("name")}
        </span>
        {/* <MdKeyboardArrowDown /> */}
      </div>

      {/* AVATAR ICON */}
      <div>
        <img
          className="h-14 w-14"
          src={profile}
          // src={
          //   localStorage.getItem("photo") === "no-photo.jpg"
          //     ? profile
          //     : `${
          //         process.env.REACT_APP_BASEURL
          //       }/uploads/profile/${localStorage.getItem("photo")}`
          // }
          alt=""
        />
      </div>
      {/* AVATAR/SETTINGS SUBMENU */}
      <div
        className={`${styles.menu} ${isProfileOpen ? styles.menu_active : ""}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>{localStorage.getItem("name")}</span>
          <span className={styles.role}>{localStorage.getItem("role")}</span>
        </div>
        <div className={styles.settings}>
          {/* <Link to="/">Settings</Link> */}
          <Link
            onClick={() => {
              localStorage.clear();
            }}
            to="/login"
          >
            <span className="text-custom-green hover:underline hover:decoration-custom-green">
              Sign Out
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
