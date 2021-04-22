import React, { useContext, useEffect, useState } from "react";

import * as api from "../services/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const APP_PREFIX = "chat-now-message-app-";

export const AuthProvider = (props) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem(APP_PREFIX + "token"))
  );
  const [data, setData] = useState({ user: null });

  const signup = async (formData) => {
    try {
      const response = await api.signup(formData);

      // Response should contain response.data.token then save setToken
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData) => {
    try {
      const response = await api.signin(formData);

      // Response should contain response.data.token then save setToken
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {
    localStorage.removeItem(APP_PREFIX + "token");
    localStorage.removeItem(APP_PREFIX + "user");

    setToken(null);
    setData({ user: null });
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await api.fetchUser({ token });

      // Response should contain response.data.user then save setData
      console.log(response);
    };

    if (token) getUser();
  }, [token]);

  if (!data.user && token) {
    return "Loading...";
  }

  return (
    <AuthContext.Provider
      value={{ data, signup, signin, signout }}
      {...props}
    />
  );
};
