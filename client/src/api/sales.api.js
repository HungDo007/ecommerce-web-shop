import axiosClient from "./axios-client";

const salesApi = {
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

  order: (data) => {
    const url = "/Sales/Order";
    return axiosClient.post(url, data);
  },
};

export default salesApi;
