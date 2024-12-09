import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5450",
  headers: {
    "x-ccvc-key": "credit-card-validator-client-key",
  },
});

export default apiClient;