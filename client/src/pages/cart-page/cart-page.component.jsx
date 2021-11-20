import { useState } from "react";
import Cart from "../../components/cart/cart.component";

import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";

import "./cart-page.styles.scss";

const CartPage = () => {
  const itemsDb = [
    {
      id: 23,
      name: "Blue Tanktop",
      imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
      price: 25,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 24,
      name: "Floral Blouse",
      imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
      price: 20,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 25,
      name: "Floral Dress",
      imageUrl: "https://i.ibb.co/KV18Ysr/floral-skirt.png",
      price: 80,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 26,
      name: "Red Dots Dress",
      imageUrl: "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
      price: 80,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 27,
      name: "Striped Sweater",
      imageUrl: "https://i.ibb.co/KmSkMbH/striped-sweater.png",
      price: 45,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 28,
      name: "Yellow Track Suit",
      imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
      price: 135,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 29,
      name: "White Blouse",
      imageUrl: "https://i.ibb.co/qBcrsJg/white-vest.png",
      price: 20,
      quantity: 1,
      isChecked: false,
    },
  ];

  const [checked, setChecked] = useState(false);
  const [cartItems, setCartItems] = useState(itemsDb);
  const [items, setItems] = useState([]);

  const handleChange = (event, position, id) => {
    if (position === -1) {
      // setChecked(event.target.checked);
      // if (event.target.checked === true) {
      //   setItems(cartItems);
      // } else {
      //   setItems([]);
      //   setCartItems(itemsDb);
      // }
    } else {
      const newCartItem = [...cartItems];

      newCartItem[position] = {
        ...newCartItem[position],
        isChecked: !newCartItem[position].isChecked,
      };

      setCartItems(newCartItem);

      if (event.target.checked === true) {
        if (!items.some((item) => item.id === id)) {
          setItems([...items, cartItems[position]]);
        }
      } else {
        setItems(items.filter((item) => item.id !== id));
      }
    }
  };

  console.log(items);

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
          <span>Quantity</span>
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
              checked={cartItem.isChecked}
              onChange={(event) => handleChange(event, index, cartItem.id)}
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
    </div>
  );
};

export default CartPage;
