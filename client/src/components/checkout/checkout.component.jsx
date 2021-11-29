import { Button, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import salesApi from "../../api/sales.api";
import userApi from "../../api/user-api";
import "./checkout.styles.scss";

const Checkout = () => {
  const [orderInfo, setOrderInfo] = useState({
    address: "",
    email: "",
    phoneNumber: "",
  });

  const { address, email, phoneNumber } = orderInfo;

  const [errors, setErrors] = useState({});

  const orderItems = useSelector((state) => state.order.orderItems);
  const currentUser = useSelector((state) => state.user.currentUser);

  const validate = (fieldValues = orderInfo) => {
    let temp = { ...errors };
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }
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
    if (validate()) {
      const payload = {
        shipAddress: address,
        shipEmail: email,
        shipPhonenumber: phoneNumber,
        orderItemId: orderItems.map((item) => item.cartId),
      };
      const order = async () => {
        try {
          const response = await salesApi.order(payload);
          console.log(response);
        } catch (error) {
          console.log("Failed to order: ", error?.response);
        }
      };
      console.log(payload);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getProfile(currentUser.unique_name);
        setOrderInfo({
          address: response.address,
          email: response.email,
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
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              label="Email"
              {...(errors.email && {
                error: true,
                helperText: errors.email,
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
        {orderItems.map((i) => (
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
      <div className="place-order">
        <Button variant="contained" color="primary" onClick={handleOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
