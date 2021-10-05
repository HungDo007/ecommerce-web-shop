import axiosClient from "./axios-client";

const adminApi = {
  //manage account
  getAllAdmin: () => {
    const url = "/Admins/user/allAdmin";
    return axiosClient.get(url);
  },

  getAllUser: () => {
    const url = "/Admins/user/allUser";
    return axiosClient.get(url);
  },

  getAllLockedUser: () => {
    const url = "/Admins/user/allUserLocked";
    return axiosClient(url);
  },

  addAmin: (data) => {
    const url = "/Admins/user/addAdmin";
    return axiosClient.post(url, data);
  },

  lockAccount: (data) => {
    const url = "/Admins/user/lockAccount";
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
};

export default adminApi;
