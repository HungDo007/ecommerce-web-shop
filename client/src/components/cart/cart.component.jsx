import "./cart.styles.scss";

const Cart = () => {
  return (
    <div className="c-item">
      <div className="image-container">
        <img src="" alt="item" />
      </div>
      <span className="name">Name</span>
      <span className="quantity">
        <div className="arrow">&#10094;</div>
        <span className="value">Quantity</span>
        <div className="arrow">&#10095;</div>
      </span>
      <span className="price">Price</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};

export default Cart;
