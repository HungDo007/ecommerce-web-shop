import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";

import { setCurrentUser } from "../../redux/user/user.actions";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

const CustomAppBar = ({ sidebar, setSidebar }) => {
  const menuId = "primary-search-account-menu";
  const cartId = "primary-cart";

  const [productName, setProductName] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [cartAnchor, setCartAnchor] = useState(null);
  const isCartOpen = Boolean(cartAnchor);

  const currentUser = useSelector((state) => state.user.currentUser);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const history = useHistory();

  const showSideBar = () => setSidebar(!sidebar);

  const handleChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSearch = () => {
    if (productName.length > 3) {
      history.push({
        pathname: "/directory/0",
        state: productName,
      });
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartOpen = (event) => {
    setCartAnchor(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchor(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(setCurrentUser(null));
    localStorage.removeItem("jwtToken");
    history.push("/");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    option: {
      marginRight: theme.spacing(2),
      display: "flex",
      alignItems: "center",
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      height: "42px",
      display: "flex",
      alignItems: "center",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    link: {
      color: "white",
      paddingLeft: "5px",
      "&:hover": {
        color: "#b6acac",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.option}
            onClick={showSideBar}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {currentUser?.role === "User" || currentUser === null ? (
            <div className={classes.search}>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={productName}
                onChange={handleChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          ) : null}

          <div className={classes.grow} />
          <div className={classes.option}>
            {currentUser ? (
              <>
                {currentUser.role === "User" ? (
                  <IconButton
                    aria-label="cart"
                    color="inherit"
                    aria-controls={cartId}
                    aria-haspopup="true"
                    onClick={handleCartOpen}
                  >
                    <Badge badgeContent={cartItems.length} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                ) : null}

                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              // <Link className={classes.typography}>Directory</Link>
              <Typography variant="h6" noWrap>
                <Link className={classes.link} to="/signin">
                  Sign In
                </Link>
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
      <Menu
        anchorEl={cartAnchor}
        getContentAnchorEl={null}
        id={cartId}
        keepMounted
        open={isCartOpen}
        onClose={handleCartClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem>
          <CartDropDown items={cartItems} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomAppBar;
