import { useEffect } from "react";
import { useLocation } from "react-router";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import salesApi from "../../api/sales.api";

const CheckoutSuccess = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    const checkoutStatus = async () => {
      const payload = {
        isSuccess: true,
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
        <CheckCircleOutlineIcon
          style={{ fontSize: 120, color: "rgb(76, 175, 80)" }}
        />
      </div>
      <h2>Your order has paid successfully</h2>
    </div>
  );
};

export default CheckoutSuccess;
