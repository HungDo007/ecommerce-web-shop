import { useEffect } from "react";
import { useLocation } from "react-router";
import salesApi from "../../api/sales.api";

const CheckoutSuccess = () => {
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

  return <div>Checkout Successfully</div>;
};

export default CheckoutSuccess;
