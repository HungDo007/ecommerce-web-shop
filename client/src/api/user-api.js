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
};

export default userApi;
