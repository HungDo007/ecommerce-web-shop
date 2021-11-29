import "./cart-item.styles.scss";

const CartItem = ({ item: { productImg, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={process.env.REACT_APP_IMAGE_URL + productImg} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">${price / quantity}</span>
    </div>
  </div>
);

export default CartItem;
