import axiosClient from "./axios-client";

const adminApi = {
  //manage account
  getAllAdmin: () => {
    const url = "/Admins/user/allAdmin";
    return axiosClient.get(url);
  },

  // getAllUser: () => {
  //   const url = "/Admins/user/allUser";
  //   return axiosClient.get(url);
  // },

  getUserPaging: (params) => {
    const url = "/Admins/user/paging";
    return axiosClient.get(url, { params });
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
};

export default adminApi;
