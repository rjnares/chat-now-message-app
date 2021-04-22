import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import * as api from "../services/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const TOKEN = "token";

export const AuthProvider = (props) => {
  const [token, setToken] = useLocalStorage(TOKEN);
  const [data, setData] = useState({ user: null });

  const signup = async (formData) => {
    let serverError = { message: "" };

    try {
      const response = await api.signup(formData);

      // Save token in local storage
      setToken(response.data.token);
    } catch (error) {
      serverError = error.response.data;
      console.log(serverError);
    } finally {
      return serverError;
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
