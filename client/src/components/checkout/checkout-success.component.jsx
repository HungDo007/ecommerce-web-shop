import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import salesApi from "../../api/sales.api";

const CheckoutSuccess = () => {
  // const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  console.log(token);

  useEffect(() => {
    const checkoutStatus = async () => {
      const payload = {
        isSuccess: true,
        token: token,
      };
      try {
        const response = await salesApi.checkoutStatus(payload);
        //console.log(payload);
        console.log(response);
      } catch (error) {
        console.log(error?.response);
      }
    };

    checkoutStatus();
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
