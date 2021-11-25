import axiosClient from "./axios-client";

const catalogApi = {
  getAllDirectory: () => {
    const url = "/Catalogs/category";
    return axiosClient.get(url);
  },

  getAllProduct: (params) => {
    const url = "/Catalogs/product";
    return axiosClient.get(url, { params });
  },

  getAllProductOfStore: (username, params) => {
    const url = `/Catalogs/allProductOfUser/${username}`;
    return axiosClient.get(url, { params });
  },

  getProductById: (id) => {
    const url = `/Catalogs/product/${id}`;
    return axiosClient.get(url);
  },

  addViewCount: (data) => {
    const url = "/Catalogs/addViewCount";
    return axiosClient.post(url, data);
  },
};

export default catalogApi;
