import axios from "axios";

const baseURL = 'datasource';

const api = axios.create({
  baseURL,
});

export default api;