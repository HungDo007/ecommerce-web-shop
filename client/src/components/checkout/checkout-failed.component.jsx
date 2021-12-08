import { useEffect } from "react";
import { useLocation } from "react-router";

import InfoIcon from "@material-ui/icons/Info";

import salesApi from "../../api/sales.api";

const CheckoutFailed = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  console.log(token);

  useEffect(() => {
    const checkoutStatus = async () => {
      const payload = {
        isSuccess: false,
        token: token,
      };
      try {
        const response = await salesApi.checkoutStatus(payload);
        if (response.status === 200 && response.statusText === "OK") {
          props.history.replace("/order");
        }
      } catch (error) {
        console.log(error?.response);
      }
    };

    setTimeout(() => checkoutStatus(), 3000);
  }, []);

  return (
    <div className="cart-page">
      <div>
        <InfoIcon style={{ fontSize: 120, color: "#f50057" }} />
      </div>
      <h2>Your order has paid failed</h2>
    </div>
  );
};

export default CheckoutFailed;
