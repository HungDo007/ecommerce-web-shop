import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

import CustomAppBar from "../custom-appbar/custom-appbar";

import { DataArr } from "./sidebarData";

import salesApi from "../../api/sales.api";

import { setCartItems } from "../../redux/cart/cart.actions";

import "./sidebar.styles.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.modal.notification);

  useEffect(() => {
    const getCart = async () => {
      try {
        const params = {
          pageIndex: 1,
          pageSize: 1000,
        };
        const response = await salesApi.getCart(params);
        dispatch(setCartItems(response.items));
      } catch (error) {}
    };
    if (localStorage.getItem("jwtToken") !== null) {
      getCart();
    }
  }, [status, dispatch]);

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
