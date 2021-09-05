import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/home.svg";
//import Icon from "../../assets/home-icon";
import CartIcon from "../cart-icon/cart-icon.component";

import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <div className="logo">
        <Logo />
      </div>
    </Link>
    <div className="options">
      <Link className="option" to="/signin">
        SIGN IN
      </Link>
      <CartIcon></CartIcon>
    </div>
  </div>
);

export default Header;
