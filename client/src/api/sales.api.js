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
  getUserOrder: (params, orderStatus) => {
    const url = `/Sales/User/Order/${orderStatus}`;
    return axiosClient.get(url, { params });
  },

  getSellerOrder: (params, orderStatus) => {
    const url = `/Sales/Seller/Order/${orderStatus}`;
    return axiosClient.get(url, { params });
  },

  getAllOrderOfSeller: (params) => {
    const url = "/Sales/OrderAllOfSeller";
    return axiosClient.get(url, { params });
  },

  getAllOrderOfUser: (params) => {
    const url = "/Sales/OrderAllOfUser";
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

  cancelOrder: (orderId) => {
    const url = `/Sales/Order/${orderId}`;
    return axiosClient.delete(url);
  },

  confirmOrder: (orderIds) => {
    const url = "/Sales/Seller/ConfirmOrder";
    return axiosClient.post(url, orderIds);
  },

  payWithPaypal: (data) => {
    const url = "/Sales/PaymentOrder";
    return axiosClient.post(url, data);
  },

  checkoutStatus: (data) => {
    const url = "/Sales/CheckoutStatus";
    return axiosClient.post(url, data);
  },
};

export default salesApi;
