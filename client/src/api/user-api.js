import axiosClient from "./axios-client";

const userApi = {
  authenticate: (data) => {
    const url = "/Users/authenticate";
    return axiosClient.post(url, data);
  },

  signUp: (data) => {
    const url = "/Users/register";
    return axiosClient.post(url, data);
  },

  getProfile: (username) => {
    const url = `/Users/${username}`;
    return axiosClient.get(url);
  },

  editProfile: (data) => {
    const url = "/Users/update";
    return axiosClient.post(url, data);
  },

  sendCode: (data) => {
    const url = "Users/sendCode";
    return axiosClient.post(url, data);
  },

  verifyEmail: (data) => {
    const url = "/Users/verifyEmail";
    return axiosClient.post(url, data);
  },

  changePassword: (data) => {
    const url = "/Users/ChangePassword";
    return axiosClient.post(url, data);
  },

  requestResetPassword: (email) => {
    const url = "/Users/RequestResetPassword";
    return axiosClient.post(url, email);
  },

  resetPassword: (data) => {
    const url = "/Users/ResetPassword";
    return axiosClient.post(url, data);
  },
};

export default userApi;
