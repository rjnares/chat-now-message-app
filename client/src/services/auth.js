import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user/`,
});

export const signup = (data) => API.post("signup", data);
export const signin = (data) => API.post("signin", data);
export const fetchUser = (token) => API.get("me", { headers: { token } });
