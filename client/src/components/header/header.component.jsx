import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/home.svg";
import CartIcon from "../cart-icon/cart-icon.component";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./header.styles.scss";

const Header = ({ currentUser, setCurrentUser }) => {
  //use hook to get currentUser from redux
  //const currentUser = useSelector((state) => state.user.currentUser);
  //const dispatch = useDispatch();
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <div className="logo">
          <Logo />
        </div>
      </Link>
      <div className="options">
        {currentUser ? (
          <div className="option" onClick={() => setCurrentUser(null)}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon></CartIcon>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
