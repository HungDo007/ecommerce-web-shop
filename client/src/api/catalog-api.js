import axiosClient from "./axios-client";

const catalogApi = {
  getAllDirectory: () => {
    const url = "/Catalogs/category";
    return axiosClient.get(url);
  },
};

export default catalogApi;
