import { useEffect } from "react";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import { useSelector } from "react-redux";

export const DataArr = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [sidebar, setSidebar] = useState([]);

  const userSidebar = [
    {
      title: "Dashboard",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "My Account",
      path: "/account",
      icon: <RiIcons.RiAccountCircleFill />,
      cName: "nav-text",
    },
    {
      title: "My Store",
      path: "/store",
      icon: <FaIcons.FaStore />,
      cName: "nav-text",
    },
  ];

  const adminSidebar = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Account",
      path: "/admin/account",
      icon: <RiIcons.RiAccountCircleFill />,
      cName: "nav-text",
    },
    {
      title: "Product",
      path: "/admin/product",
      icon: <RiIcons.RiProductHuntFill />,
      cName: "nav-text",
    },
  ];

  useEffect(() => {
    currentUser
      ? currentUser.role === "Admin"
        ? setSidebar(adminSidebar)
        : setSidebar(userSidebar)
      : setSidebar(userSidebar);
  }, [currentUser]);

  return sidebar;
};
