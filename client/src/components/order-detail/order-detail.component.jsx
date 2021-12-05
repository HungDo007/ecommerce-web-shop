import { useState } from "react";
import { useEffect } from "react";

import salesApi from "../../api/sales.api";

const OrderDetail = (props) => {
  const { orderId } = props.match.params;

  const [orders, setOrders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await salesApi.getOrderDetail(orderId);
        setOrders(response);
      } catch (error) {
        console.log("Failed to get order detail: ", error?.response);
      }
    };
    getOrderDetail();
  }, []);

  useEffect(() => {
    const total = orders.reduce(
      (accumulate, item) => accumulate + item.price,
      0
    );
    setOrderTotal(total);
  }, [orders]);

  return (
    <div className="checkout-page-block">
      <div>Order Detail</div>
      <div className="products-ordered checkout-page-container">
        <div className="checkout-ordered-header">
          <div className="header-block">Image</div>
          <div className="header-block">Name</div>
          <div className="header-block">Amount</div>
          <div className="header-block">Item Subtotal</div>
        </div>
        {orders.map((item, index) => (
          <div key={index} className="checkout-ordered-header">
            <img
              className="header-block"
              src={process.env.REACT_APP_IMAGE_URL + item.productImg}
              alt="item"
            />
            <div className="header-block">{item.name}</div>
            <div className="header-block">{item.quantity}</div>
            <div className="header-block">$ {item.price}</div>
          </div>
        ))}
        <div className="products-ordered-total">
          Merchandise Total: ${orderTotal}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
