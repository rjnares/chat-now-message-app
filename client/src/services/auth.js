import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user/`,
});

export const signup = ({ firstName, lastName, username, email, password }) => {
  API.post("signup", {
    firstName,
    lastName,
    username,
    email,
    password,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

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

export const fetchUser = ({ token }) => {
  API.get("me", {
    headers: {
      token,
    },
  })
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
