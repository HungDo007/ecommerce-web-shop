import Cart from "../../components/cart/cart.component";

import "./cart-page.styles.scss";

const CartPage = () => {
  const cartItems = [];
  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <Cart cartItem={cartItem} />
      ))}
      <div className="total">TOTAL:</div>
    </div>
  );
};

export default CartPage;
