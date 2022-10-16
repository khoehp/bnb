import { Button, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { SET_PROFILE } from "../../../features/authentication/action";
import Signin from "../../../features/authentication/signin";
import styles from "./style.module.css";
function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.profile);
  const goToHome = () => {
    history.push("/");
  };

  // const [collapsed, setCollapsed] = useState(false);

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("aaa");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });
    goToHome();
  };

  const renderUserInfo = () => {
    if (userProfile)
      return (
        <>
          <a href="#">Hi, {userProfile.user.name}</a>
          <a className="" href="#" onClick={handleLogout}>
            Log out
          </a>
        </>
      );
    return (
      <>
        <button
          onClick={() => {
            history.push("/signin");
          }}
          to="/signin"
        >
          Sign in
        </button>
        <NavLink className=" font-semibold  text-gray-900" to="/signup">
          Sign up
        </NavLink>
      </>
    );
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nabar}>{renderUserInfo()}</div>
    </nav>
  );
}

export default Header;
