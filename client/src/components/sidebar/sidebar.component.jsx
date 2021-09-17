import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import CartIcon from "../cart-icon/cart-icon.component";
import { setCurrentUser } from "../../redux/user/user.actions";
import { DataArr } from "./sidebarData";

import "./sidebar.styles.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const history = useHistory();
  const handleSignOut = () => {
    dispatch(setCurrentUser(null));
    history.push("/");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div>
          <div className="sidebar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSideBar} />
            </Link>
            <div className="options">
              {currentUser ? (
                <div className="option" onClick={handleSignOut}>
                  SIGN OUT
                </div>
              ) : (
                <Link className="option" to="/signin">
                  SIGN IN
                </Link>
              )}
              <div
                className="option"
                onClick={() =>
                  dispatch(setCurrentUser({ hung: "name", role: "Admin" }))
                }
              >
                setUser
              </div>
              <CartIcon></CartIcon>
            </div>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSideBar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {DataArr().map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="title-for-sidebar">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
