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
    let serverError = { message: "" };

    try {
      const response = await api.signin(formData);

      // Save token in local storage
      setToken(response.data.token);
    } catch (error) {
      serverError = error.response.data;
      console.log(serverError);
    } finally {
      return serverError;
    }
  };

  const signout = () => {
    setToken(null);
    setData({ user: null });
  };

  const createContact = async (email) => {
    let serverError = { message: "" };
    try {
      const response = await api.addContact(token, email);

      // Update saved data user contacts
      setData((prevData) => ({
        user: { ...prevData.user, contacts: response.data.updatedContacts },
      }));
    } catch (error) {
      serverError = error.response.data;
      console.log(serverError);
    } finally {
      return serverError;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      let serverError = { message: "" };
      try {
        const response = await api.fetchUser(token);

        // Save user data in memory
        setData(response.data);
      } catch (error) {
        // If error occurs, we will be in loading state
        serverError = error.response.data;
        console.log(serverError);

        if (serverError.message === "Token is invalid or expired") {
          // clear token from local storage since we need new one from signup/signin
          // if do not clear token from local storage, then 'UnauthenticatedApp' (which
          // is used for signup/signin) will not render and we will not be able to get
          // a new one since we will be stuck with the old token
          setToken(null);
        }
      }
    };

    if (token) getUser();
  }, [token, setToken]);

  // Return loading message if we don't have token AND user data
  if (!data.user && token) {
    return "Loading...";
  }

  return (
    <AuthContext.Provider
      value={{ data, signup, signin, signout, createContact }}
      {...props}
    />
  );
};
