import axiosClient from "./axios-client";

const adminApi = {
  //manage account
  getAdminPaging: (params) => {
    const url = "/Admins/user/adminPaging";
    return axiosClient.get(url, { params });
  },

  getUserPaging: (params) => {
    const url = "/Admins/user/userPaging";
    return axiosClient.get(url, { params });
  },

  getLockedUserPaging: (params) => {
    const url = "/Admins/user/userLockedPaging";
    return axiosClient(url, { params });
  },

  addAmin: (data) => {
    const url = "/Admins/user/addAdmin";
    return axiosClient.post(url, data);
  },

  lockAccount: (data) => {
    const url = "/Admins/user/lockAccount";
    return axiosClient.post(url, data);
  },

  unlockAccount: (data) => {
    const url = "/Admins/user/unlockAccount";
    return axiosClient.post(url, data);
  },

  //manage directory
  addDirectory: (data) => {
    const url = "/Admins/category/add";
    return axiosClient.post(url, data);
  },

  editDirectory: (data) => {
    const url = "/Admins/category/update";
    return axiosClient.post(url, data);
  },

  removeDirectory: (id) => {
    const url = `/Admins/category/delete/${id}`;
    return axiosClient.delete(url);
  },

  addComponentToDirectory: (data) => {
    const url = "/Admins/category/assignComp";
    return axiosClient.post(url, data);
  },

  getComponentOfDirectory: (id) => {
    const url = `/Admins/category/comp/${id}`;
    return axiosClient.get(url);
  },

  //manage component
  getAllComponent: () => {
    const url = "/Admins/component";
    return axiosClient.get(url);
  },

  addComponent: (data) => {
    const url = "/Admins/component/add";
    return axiosClient.post(url, data);
  },

  editComponent: (data) => {
    const url = "/Admins/component/update";
    return axiosClient.post(url, data);
  },

  removeComponent: (id) => {
    const url = `/Admins/component/${id}`;
    return axiosClient.delete(url);
  },

  //manage product
  getProductPaging: (params) => {
    const url = "/Admins/product/productAll";
    return axiosClient.get(url, { params });
  },

  getLockedProductPaging: (params) => {
    const url = "/Admins/product/productLocked";
    return axiosClient.get(url, { params });
  },

  lockProduct: (data) => {
    const url = "/Admins/product/lockProduct";
    return axiosClient.post(url, data);
  },

  unlockProduct: (data) => {
    const url = "/Admins/product/unlockProduct";
    return axiosClient.post(url, data);
  },
};

export default adminApi;
