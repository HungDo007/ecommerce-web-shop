import axios from "axios";

const API_URL = "http://localhost:9209/api";

const callApi = (endpoint, method = "get", body) => {
  axios({
    url: `${API_URL}/${endpoint}`,
    method,
    data: body,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default callApi;
