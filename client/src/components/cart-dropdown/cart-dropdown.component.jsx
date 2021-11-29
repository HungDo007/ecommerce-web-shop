import CartItem from "../cart-item/cart-item.component";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./cart-dropdown.styles.scss";

const CartDropDown = ({ items }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {items.length ? (
          items.map((cartItem) => (
            <CartItem key={cartItem.cartId} item={cartItem} />
          ))
        ) : (
          <div className="cart-empty-block">
            <img
              className="cart-empty-img"
              alt="cart-empty-img"
              src="https://image.shutterstock.com/image-vector/opened-empty-box-cute-frustrated-600w-690994567.jpg"
            />
            <span className="empty-message">Your cart is empty</span>
          </div>
        )}
      </div>
      <div className="link-button">
        <Link to="/cart">
          <Button variant="contained" color="primary">
            GO TO CART
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropDown;
