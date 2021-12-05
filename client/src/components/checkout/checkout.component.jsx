import { Button, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
      const payload = {
        shipAddress: address,
        shipName: name,
        shipPhonenumber: phoneNumber,
        orderItemId: orderItems.items.map((item) => item.cartId),
      };
      const order = async () => {
        try {
          const response = await salesApi.order(payload);
          if (response.status === 200 && response.statusText === "OK") {
            dispatch(toggleNotification());
            props.history.push("/order");
          }
        } catch (error) {
          console.log("Failed to order: ", error?.response);
        }
      };
      //console.log(payload);
      order();
    }
  };

  const handlePayWithPaypal = () => {
    if (validate() && orderItems.items.length !== 0) {
      const payload = {
        shipAddress: address,
        shipName: name,
        shipPhonenumber: phoneNumber,
        orderItemId: orderItems.items.map((item) => item.cartId),
      };

      const paymentWithPayPal = async () => {
        try {
          const response = await salesApi.payWithPaypal(payload);
          window.location.href = response;
        } catch (error) {
          console.log("failed to pay: ", error?.response);
          dispatch(toggleNotification());
          props.history.push("/order");
        }
      };

      paymentWithPayPal();
      //console.log(payload);
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
      } catch (error) {
        console.log("Failed to get profile: ", error?.response);
      }
    };

    getUserProfile();
  }, []);

  return (
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
        <div className="checkout-ordered-header">
          <div className="header-block">Image</div>
          <div className="header-block">Name</div>
          <div className="header-block">Component</div>
          <div className="header-block">Amount</div>
          <div className="header-block">Item Subtotal</div>
        </div>
        {orderItems.items.map((i) => (
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
        <div className="products-ordered-total">
          Merchandise Total: ${orderItems.total}
        </div>
      </div>
      <div className="place-order">
        <Button variant="contained" color="secondary" onClick={handleOrder}>
          Cash On Delivery
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayWithPaypal}
        >
          Pay with Paypal
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
