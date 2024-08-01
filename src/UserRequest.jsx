import axios from "axios";
import { baseUrl, baseUrlnpc } from "./config/authConfig";

const newRequest = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default newRequest;

const newRequestnpc = axios.create({
  baseURL: baseUrlnpc,
  withCredentials: true,
});
export { newRequestnpc };
