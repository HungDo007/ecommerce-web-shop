import { useEffect, useState } from "react";

import { CircularProgress } from "@material-ui/core";

import salesApi from "../../api/sales.api";

const OrderDetail = (props) => {
  const { orderId } = props.match.params;

  const [orders, setOrders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await salesApi.getOrderDetail(orderId);
        setOrders(response);
        setIsLoading(false);
      } catch (error) {}
    };
    getOrderDetail();
  }, [orderId]);

  useEffect(() => {
    const total = orders.reduce(
      (accumulate, item) => accumulate + item.price,
      0
    );
    setOrderTotal(total);
  }, [orders]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircularProgress style={{ height: "80px", width: "80px" }} />
        </div>
      ) : (
        <div className="checkout-page-block">
          <div>Order Detail</div>
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
            <div className="checkout-ordered-shop-container">
              {orders.map((item, index) => (
                <div key={index} className="checkout-ordered-header">
                  <img
                    className="header-block"
                    src={process.env.REACT_APP_IMAGE_URL + item.productImg}
                    alt="item"
                  />
                  <div className="header-block">{item.name}</div>
                  <div className="header-block">{item.details}</div>
                  <div className="header-block">{item.quantity}</div>
                  <div className="header-block">$ {item.price}</div>
                </div>
              ))}
            </div>

            <div className="products-ordered-total">
              Merchandise Total: ${orderTotal}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
