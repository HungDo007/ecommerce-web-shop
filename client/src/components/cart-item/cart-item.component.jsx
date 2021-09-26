import "./cart-item.styles.scss";

const CartItem = ({ item: { imgUrl, price, name, quantity } }) => (
  <div className="cart-item">
    <img src="" alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;
