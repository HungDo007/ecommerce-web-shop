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
