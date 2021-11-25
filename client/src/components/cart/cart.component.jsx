// import { useState } from "react";

import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";

import "./cart.styles.scss";

const Cart = ({
  index,
  checked,
  cartItem: { name, quantity, price, imageUrl, isChecked },
}) => {
  if (checked) {
    isChecked = true;
  }

  // useEffect(() => {
  //   if (checked) {
  //     console.log("a");
  //   }
  // }, [checked]);

  const handleChange = (position) => {
    console.log(position);
  };

  return (
    <div className="c-item">
      <div>
        <Checkbox checked={isChecked} onChange={() => handleChange(index)} />
      </div>
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <Tooltip title="Decrease item by 1">
          <IconButton aria-label="decrease item">
            <ArrowBackIosIcon />
          </IconButton>
        </Tooltip>
        <span className="value">{quantity}</span>
        <Tooltip title="Increase item by 1">
          <IconButton aria-label="increase item">
            <ArrowForwardIosIcon />
          </IconButton>
        </Tooltip>
      </span>
      <span className="price">{price}</span>
      <Tooltip title="Remove item">
        <IconButton aria-label="remove item">
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Cart;
