import { useState } from "react";
import Cart from "../../components/cart/cart.component";

import { Button, Checkbox, IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";

import "./cart-page.styles.scss";
import { useEffect } from "react";

const CartPage = () => {
  const itemsDb = [
    {
      id: 23,
      name: "Blue Tank Top",
      imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
      price: 25,
      quantity: 1,
      stock: 100,
    },
    {
      id: 24,
      name: "Floral Blouse",
      imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
      price: 20,
      quantity: 1,
      stock: 100,
    },
  ];

  const [checked, setChecked] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    setTimeout(() => setCartItems(itemsDb), 1000);
  }, []);

  useEffect(() => {
    if (items.length === cartItems.length && items.length !== 0) {
      setChecked(true);
    }
    if (items.length < cartItems.length) {
      setChecked(false);
    }
  }, [items]);

  const handleChange = (event, position) => {
    const id = Number(event.target.value);

    if (position === -1) {
      setChecked(event.target.checked);
      if (event.target.checked === true) {
        setItems(cartItems);
      } else {
        setItems([]);
      }
    } else {
      if (event.target.checked) {
        if (!items.some((item) => item.id === id)) {
          setItems([...items, cartItems[position]]);
        }
      } else {
        setItems(items.filter((item) => item.id !== id));
      }
    }
  };

  const handleCheckout = () => {
    console.log(items);
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <Checkbox
            checked={checked}
            onChange={(event) => handleChange(event, -1)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div className="header-block">
          <span>Image</span>
        </div>
        <div className="header-block">
          <span>Name</span>
        </div>
        <div className="header-block">
          <span>Amount</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem, index) => (
        <div key={cartItem.id} className="c-item">
          <div>
            <Checkbox
              value={cartItem.id}
              checked={items.map((item) => item.id).includes(cartItem.id)}
              onChange={(event) => handleChange(event, index)}
            />
          </div>
          <div className="image-container">
            <img src={cartItem.imageUrl} alt="item" />
          </div>
          <span className="name">{cartItem.name}</span>
          <span className="quantity">
            <Tooltip title="Decrease item by 1">
              <IconButton aria-label="decrease item">
                <ArrowBackIosIcon />
              </IconButton>
            </Tooltip>
            <span className="value">{cartItem.quantity}</span>
            <Tooltip title="Increase item by 1">
              <IconButton aria-label="increase item">
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </span>
          <span className="price">{cartItem.price}</span>
          <Tooltip title="Remove item">
            <IconButton aria-label="remove item">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      ))}
      <div className="total">TOTAL:</div>
      <div>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
