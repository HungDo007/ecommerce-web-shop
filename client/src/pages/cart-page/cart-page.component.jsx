import { useState } from "react";
import Cart from "../../components/cart/cart.component";

import { Button, Checkbox, IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";

import "./cart-page.styles.scss";
import { useEffect } from "react";
import salesApi from "../../api/sales.api";
import { Pagination } from "@material-ui/lab";

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

  const [page, setPage] = useState(1);

  const [cartPaging, setCartPaging] = useState({
    items: [],
    pageIndex: page,
    pageSize: 5,
    pageCount: 0,
    totalRecord: 0,
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const params = {
          pageIndex: page,
          pageSize: 5,
        };
        const response = await salesApi.getCart(params);
        setCartPaging(response);
      } catch (error) {
        console.log("Failed to get cart: ", error?.response);
      }
    };
    getCart();
  }, []);

  useEffect(() => {
    if (items.length === cartPaging.items.length && items.length !== 0) {
      setChecked(true);
    }
    if (items.length < cartPaging.items.length) {
      setChecked(false);
    }
  }, [items]);

  const handleChange = (event, position) => {
    const id = Number(event.target.value);

    if (position === -1) {
      setChecked(event.target.checked);
      if (event.target.checked === true) {
        setItems(cartPaging.items);
      } else {
        setItems([]);
      }
    } else {
      if (event.target.checked) {
        if (!items.some((item) => item.id === id)) {
          setItems([...items, cartPaging.items[position]]);
        }
      } else {
        setItems(items.filter((item) => item.id !== id));
      }
    }
  };

  const handleCheckout = () => {
    console.log(items);
  };

  console.log(cartPaging);

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
          <span>Unit Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartPaging.items.map((cartItem, index) => (
        <div key={cartItem.id} className="c-item">
          <div>
            <Checkbox
              value={cartItem.id}
              checked={items.map((item) => item.id).includes(cartItem.id)}
              onChange={(event) => handleChange(event, index)}
            />
          </div>
          <div className="image-container">
            <img
              src={process.env.REACT_APP_IMAGE_URL + cartItem.productImg}
              alt="item"
            />
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
          <span className="price">$ {cartItem.price}</span>
          <Tooltip title="Remove item">
            <IconButton aria-label="remove item">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      ))}
      <div className="total">TOTAL: $999</div>
      <div>
        <Pagination
          defaultPage={1}
          shape="rounded"
          color="primary"
          count={cartPaging.pageCount}
          onChange={(event, page) => setPage(page)}
        />
      </div>
      <div>
        <Button
          className="cart-page-checkout"
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
