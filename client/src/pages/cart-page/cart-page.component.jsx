import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button, Checkbox, IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";

import Notification from "../../components/notification/notification.component";

import { setOrderItems } from "../../redux/order/order.actions";

import salesApi from "../../api/sales.api";

import { toggleNotification } from "../../redux/modal/modal.actions";
import "./cart-page.styles.scss";

const emptyCart = "/img/empty-cart.jpg";

const CartPage = () => {
  const [checked, setChecked] = useState(false);

  const [total, setTotal] = useState(0);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [items, setItems] = useState([]);

  const [removeItems, setRemoveItems] = useState([]);

  const [shopItems, setShopItems] = useState([]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const removeItem = async () => {
    try {
      const response = await salesApi.removeItemFromCart(removeItems);
      if (response.status === 200 && response.statusText === "OK") {
        dispatch(toggleNotification());
      }
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Sorry, something went wrong",
        type: "error",
      });
    }
  };

  useEffect(() => {
    let a = [];
    cartItems.forEach((element, index, arr) => {
      if (!a.some((item) => item.shopName === element.shopName)) {
        let obj = {
          seller: element.seller,
          shopName: element.shopName,
          item: cartItems.filter((c) => c.shopName === element.shopName),
        };
        a.push(obj);
      }
    });
    setShopItems(a);
  }, [cartItems]);

  useEffect(() => {
    if (items.length === cartItems.length && items.length !== 0) {
      setChecked(true);
    }
    if (items.length < cartItems.length) {
      setChecked(false);
    }

    const total = items.reduce(
      (accumulate, item) => accumulate + item.price,
      0
    );
    setTotal(total);
  }, [items, cartItems.length]);

  useEffect(() => {
    removeItem();
  }, [removeItems]);

  const handleChange = (event, position, index) => {
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
        if (!items.some((item) => item.cartId === id)) {
          setItems([...items, shopItems[position].item[index]]);
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
          setItems([]);
          dispatch(toggleNotification());
        }
      } catch (error) {
        setNotify({
          isOpen: true,
          message: "Sorry, something went wrong",
          type: "error",
        });
      }
    };
    editAmount();
  };

  const handleRemove = (cartId) => {
    if (cartId === -1) {
      let items = [];
      items = cartItems.map((item) => item.cartId);
      setRemoveItems(items);
    } else {
      setRemoveItems([cartId]);
    }
    setItems([]);
  };

  const handleCheckout = () => {
    const orderItems = {
      items,
      total,
    };
    dispatch(setOrderItems(orderItems));
    history.push("/checkout");
  };

  return (
    <div>
      {cartItems.length ? (
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
          {shopItems.map((shopItem, idx) => (
            <div className="cart-shop-container" key={idx}>
              <div>
                {shopItem.shopName ? shopItem.shopName : shopItem.seller}
              </div>
              {shopItem.item.map((cartItem, index) => (
                <div key={cartItem.cartId} className="c-item">
                  <div>
                    <Checkbox
                      value={cartItem.cartId}
                      checked={items
                        .map((item) => item.cartId)
                        .includes(cartItem.cartId)}
                      onChange={(event) => handleChange(event, idx, index)}
                    />
                  </div>
                  <div className="image-container">
                    <img
                      src={
                        process.env.REACT_APP_IMAGE_URL + cartItem.productImg
                      }
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
                    <div className="stock">
                      {cartItem.stockOfDetail} available
                    </div>
                  </div>
                  <span className="price">${cartItem.price}</span>
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
            </div>
          ))}

          <div className="total">TOTAL: ${total}</div>
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
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      ) : (
        <div className="cart-empty-block">
          <img
            className="cart-empty-img"
            alt="cart-empty-img"
            src={emptyCart}
          />
          <span className="empty-message">Your cart is empty</span>
        </div>
      )}
    </div>
  );
};

export default CartPage;
