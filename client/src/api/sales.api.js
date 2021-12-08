import axiosClient from "./axios-client";

const salesApi = {
  //cart
  getCart: (params) => {
    const url = "/Sales/cart";
    return axiosClient.get(url, { params });
  },

  addToCart: (data) => {
    const url = "/Sales/AddCart";
    return axiosClient.post(url, data);
  },

  editAmount: (data) => {
    const url = "/Sales/UpdateQuantity";
    return axiosClient.post(url, data);
  },

  removeItemFromCart: (data) => {
    const url = "/Sales/RemoveCart";
    return axiosClient.post(url, data);
  },

  //order
  getOrder: (params) => {
    const url = "/Sales/Order";
    return axiosClient.get(url, { params });
  },

  getOrderDetail: (orderId) => {
    const url = `/Sales/Order/${orderId}`;
    return axiosClient.get(url);
  },

  order: (data) => {
    const url = "/Sales/Order";
    return axiosClient.post(url, data);
  },

  payWithPaypal: (data) => {
    const url = "/Sales/PaymentOrder";
    return axiosClient.post(url, data);
  },

  checkoutStatus: (data) => {
    const url = "/Sales/CheckoutStatus";
    return axiosClient.post(url, data);
  },

  cancelOrder: (orderId) => {
    const url = `/Sales/Order/${orderId}`;
    return axiosClient.delete(url);
  },

  getUnconfirmedOrder: (params) => {
    const url = "/Sales/OrderInProcess";
    return axiosClient.get(url, { params });
  },

  getAllOrderOfSeller: (params) => {
    const url = "/Sales/OrderAllOfSeller";
    return axiosClient.get(url, { params });
  },

  confirmOrder: (orderIds) => {
    const url = "/Sales/ConfirmOrder";
    return axiosClient.post(url, orderIds);
  },
};

export default salesApi;
