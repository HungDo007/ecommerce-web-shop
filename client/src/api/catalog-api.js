import axiosClient from "./axios-client";

const catalogApi = {
  getAllDirectory: () => {
    const url = "/Catalogs/category";
    return axiosClient.get(url);
  },

  getAllProduct: () => {
    const url = "/Catalogs/product";
    return axiosClient.get(url);
  },

  getAllProductOfStore: (username) => {
    const url = `/Catalogs/allProductOfUser/${username}`;
    return axiosClient.get(url);
  },

  getProductById: (id) => {
    const url = `/Catalogs/product/${id}`;
    return axiosClient.get(url);
  },
};

export default catalogApi;
