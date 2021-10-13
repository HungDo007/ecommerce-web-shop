import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";
import { Link } from "react-router-dom";

const CartDropDown = () => {
  const cartItems = [];
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Link to="/cart">
        <CustomButton>GO TO CART</CustomButton>
      </Link>
    </div>
  );
};

export default CartDropDown;
