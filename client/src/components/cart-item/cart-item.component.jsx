import { formatMoney } from "../../utils/format-money";
import { cut } from "../../utils/cut-string";

import "./cart-item.styles.scss";

const CartItem = ({ item: { productImg, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={process.env.REACT_APP_IMAGE_URL + productImg} alt="item" />
    <div className="item-details">
      <span className="name">{cut(name, 20)}</span>
      <span className="price">{`$${formatMoney(price)} x ${quantity}`}</span>
    </div>
  </div>
);

export default CartItem;
