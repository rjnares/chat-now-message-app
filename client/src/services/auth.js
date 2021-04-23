import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user/`,
});

export const signup = (data) => API.post("signup", data);
export const fetchUser = (token) => API.get("me", { headers: { token } });

export const signin = ({ username, password }) => {
  API.post("signin", {
    username,
    password,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
