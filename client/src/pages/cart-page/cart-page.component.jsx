import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { Button, Checkbox, IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";
import { Pagination } from "@material-ui/lab";

import { setOrderItems } from "../../redux/order/order.actions";

import salesApi from "../../api/sales.api";

import "./cart-page.styles.scss";
import { toggleNotification } from "../../redux/modal/modal.actions";

const CartPage = () => {
  const [checked, setChecked] = useState(false);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [cartPaging, setCartPaging] = useState({
    items: [],
    pageIndex: page,
    pageSize: 5,
    pageCount: 0,
    totalRecord: 0,
  });

  const [items, setItems] = useState([]);

  const [removeItems, setRemoveItems] = useState([]);

  const history = useHistory();

  const dispatch = useDispatch();

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

  const removeItem = async () => {
    try {
      const response = await salesApi.removeItemFromCart(removeItems);
      if (response.status === 200 && response.statusText === "OK") {
        getCart();
        dispatch(toggleNotification());
      }
    } catch (error) {
      console.log("Failed to remove cart item: ", error?.response);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (items.length === cartPaging.items.length && items.length !== 0) {
      setChecked(true);
    }
    if (items.length < cartPaging.items.length) {
      setChecked(false);
    }

    const total = items.reduce(
      (accumulate, item) => accumulate + item.price,
      0
    );
    setTotal(total);
  }, [items]);

  useEffect(() => {
    removeItem();
  }, [removeItems]);

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
        if (!items.some((item) => item.cartId === id)) {
          setItems([...items, cartPaging.items[position]]);
        }
      } else {
        setItems(items.filter((item) => item.cartId !== id));
      }
    }
  };

  const handleUpdateAmount = (string, id, quantity, stock) => {
    const payload = {
      cartId: id,
      isIncrease: string === "increase" ? true : false,
    };

    if (quantity === 1 && string === "decrease") {
      setRemoveItems([id]);
    }

    if (quantity === stock && string === "increase") {
      return;
    }

    const editAmount = async () => {
      try {
        const response = await salesApi.editAmount(payload);
        if (response.status === 200 && response.statusText === "OK") {
          getCart();
        }
      } catch (error) {
        console.log("Failed to edit amount: ", error?.response);
      }
    };
    editAmount();
  };

  const handleRemove = (cartId) => {
    if (cartId === -1) {
      let items = [];
      items = cartPaging.items.map((item) => item.cartId);
      setRemoveItems(items);
    } else {
      setRemoveItems([cartId]);
    }
  };

  const handleCheckout = () => {
    //console.log(items);
    const orderItems = {
      items,
      total,
    };
    dispatch(setOrderItems(orderItems));
    history.push("/checkout");
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
          <span>Component</span>
        </div>
        <div className="header-block">
          <span>Amount</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div
          className="header-block remove-all"
          onClick={() => handleRemove(-1)}
        >
          <span>Remove</span>
        </div>
      </div>
      {cartPaging.items.map((cartItem, index) => (
        <div key={cartItem.cartId} className="c-item">
          <div>
            <Checkbox
              value={cartItem.cartId}
              checked={items
                .map((item) => item.cartId)
                .includes(cartItem.cartId)}
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
          <span className="name">{cartItem.details}</span>
          <div className="quantity">
            <div>
              <Tooltip title="Decrease item by 1">
                <IconButton
                  value="Decrease"
                  onClick={() =>
                    handleUpdateAmount(
                      "decrease",
                      cartItem.cartId,
                      cartItem.quantity,
                      cartItem.stockOfDetail
                    )
                  }
                  aria-label="decrease item"
                >
                  <ArrowBackIosIcon />
                </IconButton>
              </Tooltip>
              <span className="value">{cartItem.quantity}</span>
              <Tooltip title="Increase item by 1">
                <IconButton
                  onClick={() =>
                    handleUpdateAmount(
                      "increase",
                      cartItem.cartId,
                      cartItem.quantity,
                      cartItem.stockOfDetail
                    )
                  }
                  aria-label="increase item"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="stock">{cartItem.stockOfDetail} available</div>
          </div>
          <span className="price">$ {cartItem.price}</span>
          <Tooltip title="Remove item">
            <IconButton
              aria-label="remove item"
              onClick={() => handleRemove(cartItem.cartId)}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      ))}
      <div className="total">TOTAL: ${total}</div>
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
          disabled={items.length === 0 ? true : false}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
