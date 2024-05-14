import axios from "axios";

export const API_URL =
  "https://zharatylyshtravel-server-production.up.railway.app/api";

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

export default $api;
