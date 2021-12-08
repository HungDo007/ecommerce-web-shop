import axiosClient from "./axios-client";

const storeApi = {
  getComponentOfDirectory: (catId) => {
    const url = `/Stores/compInCat/${catId}`;
    return axiosClient.get(url);
  },

  addProduct: (data) => {
    const url = "/Stores";
    return axiosClient.post(url, data);
  },

  addDetail: (id, data) => {
    const url = `/Stores/${id}/addDetail`;
    return axiosClient.post(url, data);
  },

  editProduct: (data) => {
    const url = "/Stores/updatePro";
    return axiosClient.post(url, data);
  },

  editDetail: (data, productId) => {
    const url = `/Stores/updateDetail/${productId}`;
    return axiosClient.post(url, data);
  },

  removeProduct: (proId) => {
    const url = `/Stores/${proId}`;
    return axiosClient.delete(url);
  },

  getHiddenProduct: (username, params) => {
    const url = `/Stores/productHideOfUser/${username}`;
    return axiosClient.get(url, { params });
  },

  hideProduct: (data) => {
    const url = "/Stores/hideProduct";
    return axiosClient.post(url, data);
  },

  showProduct: (data) => {
    const url = "/Stores/unhideProduct";
    return axiosClient.post(url, data);
  },

  getProfile: (username) => {
    const url = `/Stores/storeInfo/${username}`;
    return axiosClient.get(url);
  },

  editProfile: (data) => {
    const url = "/Stores/storeInfo";
    return axiosClient.post(url, data);
  },
};

export default storeApi;
