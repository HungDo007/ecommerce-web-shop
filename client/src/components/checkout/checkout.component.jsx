import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, CircularProgress, TextField } from "@material-ui/core";
import salesApi from "../../api/sales.api";
import userApi from "../../api/user-api";
import { toggleNotification } from "../../redux/modal/modal.actions";
import "./checkout.styles.scss";

const Checkout = (props) => {
  const [orderInfo, setOrderInfo] = useState({
    address: "",
    name: "",
    phoneNumber: "",
  });

  const { address, name, phoneNumber } = orderInfo;

  const [errors, setErrors] = useState({});
  const [requestItems, setRequestItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const orderItems = useSelector((state) => state.order.orderItems);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const validate = (fieldValues = orderInfo) => {
    let temp = { ...errors };
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required";
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber = fieldValues.phoneNumber
        ? ""
        : "This field is required";

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOrderInfo({ ...orderInfo, [name]: value });
    validate({ [name]: value });
  };

  const handleOrder = () => {
    if (validate() && orderItems.items.length !== 0) {
      const payload = requestItems.map((item) => ({
        seller: item.seller,
        shipAddress: address,
        shipName: name,
        shipPhonenumber: phoneNumber,
        orderItemId: item.orderItems.map((i) => i.cartId),
      }));

      const order = async () => {
        try {
          const response = await salesApi.order(payload);
          if (response.status === 200 && response.statusText === "OK") {
            dispatch(toggleNotification());
            props.history.replace("/order");
          }
        } catch (error) {
          if (error.response.status === 400) {
            props.history.replace("/user");
          }
        }
      };
      order();
    }
  };

  const handlePayWithPaypal = () => {
    if (validate() && orderItems.items.length !== 0) {
      const payload = requestItems.map((item) => ({
        seller: item.seller,
        shipAddress: address,
        shipName: name,
        shipPhonenumber: phoneNumber,
        orderItemId: item.orderItems.map((i) => i.cartId),
      }));

      const paymentWithPayPal = async () => {
        try {
          const response = await salesApi.payWithPaypal(payload);
          window.location.href = response;
        } catch (error) {
          props.history.replace("/user");
        }
      };

      paymentWithPayPal();
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getProfile(currentUser.unique_name);
        setOrderInfo({
          address: response.address,
          name: `${response.firstName} ${response.lastName}`,
          phoneNumber: response.phoneNumber,
        });
      } catch (error) {}
    };

    if (orderItems.items.length) {
      getUserProfile();
      setIsLoading(false);

      let a = [];
      orderItems.items.forEach((element) => {
        if (!a.some((item) => item.shopName === element.shopName)) {
          let obj = {
            seller: element.seller,
            shopName: element.shopName ? element.shopName : element.seller,
            orderItems: orderItems.items.filter(
              (c) => c.shopName === element.shopName
            ),
          };
          a.push(obj);
        }
      });
      setRequestItem(a);
    } else {
      props.history.replace("/");
    }
  }, [currentUser.unique_name, orderItems.items, props.history]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircularProgress style={{ height: "80px", width: "80px" }} />
        </div>
      ) : (
        <div className="checkout-page-block">
          <div className="checkout-page-container">
            <div>Delivery Address</div>
            <div className="input-fields">
              <div className="input">
                <TextField
                  name="address"
                  value={address}
                  fullWidth
                  type="text"
                  label="Address"
                  onChange={handleChange}
                  {...(errors.address && {
                    error: true,
                    helperText: errors.address,
                  })}
                />
              </div>
              <div className="input">
                <TextField
                  name="name"
                  value={name}
                  onChange={handleChange}
                  fullWidth
                  label="Name"
                  {...(errors.name && {
                    error: true,
                    helperText: errors.name,
                  })}
                />
              </div>
              <div className="input">
                <TextField
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  label="Phone Number"
                  {...(errors.phoneNumber && {
                    error: true,
                    helperText: errors.phoneNumber,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="products-ordered checkout-page-container">
            <div className="checkout-ordered-shop-container">
              <div className="checkout-ordered-header">
                <div className="header-block">Image</div>
                <div className="header-block">Name</div>
                <div className="header-block">Component</div>
                <div className="header-block">Amount</div>
                <div className="header-block">Item Subtotal</div>
              </div>
            </div>
            {requestItems.map((requestItem) => (
              <div
                key={requestItem.seller}
                className="checkout-ordered-shop-container"
              >
                <div>{requestItem.shopName}</div>
                {requestItem.orderItems.map((i) => (
                  <div key={i.cartId} className="checkout-ordered-header">
                    <img
                      className="header-block"
                      src={process.env.REACT_APP_IMAGE_URL + i.productImg}
                      alt="item"
                    />
                    <div className="header-block">{i.name}</div>
                    <div className="header-block">{i.details}</div>
                    <div className="header-block">{i.quantity}</div>
                    <div className="header-block">$ {i.price}</div>
                  </div>
                ))}
              </div>
            ))}

            <div className="products-ordered-total">
              Merchandise Total: ${orderItems.total}
            </div>
          </div>
          <div className="place-order">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOrder}
              disabled={orderItems.items.length ? false : true}
            >
              Cash On Delivery
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayWithPaypal}
              disabled={orderItems.items.length ? false : true}
            >
              Pay with Paypal
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
