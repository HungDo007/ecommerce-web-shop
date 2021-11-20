import CartItem from "../cart-item/cart-item.component";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
  const cartItems = [
    {
      id: 23,
      name: "Blue Tanktop",
      imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
      price: 25,
      quantity: 1,
    },
    {
      id: 24,
      name: "Floral Blouse",
      imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
      price: 20,
      quantity: 1,
    },
    {
      id: 25,
      name: "Floral Dress",
      imageUrl: "https://i.ibb.co/KV18Ysr/floral-skirt.png",
      price: 80,
      quantity: 1,
    },
    {
      id: 26,
      name: "Red Dots Dress",
      imageUrl: "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
      price: 80,
      quantity: 1,
    },
    {
      id: 27,
      name: "Striped Sweater",
      imageUrl: "https://i.ibb.co/KmSkMbH/striped-sweater.png",
      price: 45,
      quantity: 1,
    },
    {
      id: 28,
      name: "Yellow Track Suit",
      imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
      price: 135,
      quantity: 1,
    },
    {
      id: 29,
      name: "White Blouse",
      imageUrl: "https://i.ibb.co/qBcrsJg/white-vest.png",
      price: 20,
      quantity: 1,
    },
  ];

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
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
