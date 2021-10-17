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
};

export default storeApi;
