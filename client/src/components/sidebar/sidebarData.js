import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";

export const DataArr = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [sidebar, setSidebar] = useState([]);

  const guestSidebar = [
    {
      title: "Dashboard",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  ];

  const userSidebar = [
    {
      title: "Dashboard",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "My Account",
      path: "/user",
      icon: <RiIcons.RiAccountCircleFill />,
      cName: "nav-text",
    },
    {
      title: "My Store",
      path: "/store",
      icon: <FaIcons.FaStore />,
      cName: "nav-text",
    },
    {
      title: "My Order",
      path: "/order",
      icon: <MdIcons.MdReceipt />,
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
      title: "Directory",
      path: "/admin/directory",
      icon: <AiIcons.AiOutlineBars />,
      cName: "nav-text",
    },
    {
      title: "Component",
      path: "/admin/component",
      icon: <GiIcons.GiPapers />,
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
      : setSidebar(guestSidebar);
  }, [currentUser]);

  return sidebar;
};
