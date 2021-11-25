import { Link } from "react-router-dom";
import { useState } from "react";

import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

import CustomAppBar from "../custom-appbar/custom-appbar";

import { DataArr } from "./sidebarData";

import "./sidebar.styles.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div>
          <CustomAppBar sidebar={sidebar} setSidebar={setSidebar} />
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
