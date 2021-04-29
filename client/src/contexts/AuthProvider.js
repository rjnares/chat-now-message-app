import React, { useContext, useEffect, useState, useCallback } from "react";
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

  const removeContact = async (contact) => {
    let serverError = { message: "" };

    try {
      const response = await api.deleteContact(token, contact);

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

  const getContact = async (contact) => {
    let result = { message: "", contact: null };
    try {
      const response = await api.fetchContact(token, contact);
      result.contact = response.data.contactInfo;
    } catch (error) {
      result.message = error.response.data.message;
    } finally {
      return result;
    }
  };

  const createConversation = async (name, recipients) => {
    let result = { message: "", conversation: null };
    try {
      const response = await api.postConversation(token, name, recipients);
      result.conversation = response.data.conversation;
    } catch (error) {
      result.message = error.response.data.message;
    } finally {
      return result;
    }
  };

  const fetchConversations = async () => {
    let result = { message: "", conversations: null };
    try {
      const response = await api.getConversations(token);
      result.conversations = response.data;
    } catch (error) {
      result.message = error.response.data.message;
    } finally {
      return result;
    }
  };

  const getConversation = async (conversationId) => {
    let result = { message: "", conversation: null };
    try {
      const response = await api.fetchConversation(token, conversationId);
      result.conversation = response.data.conversation;
    } catch (error) {
      result.message = error.response.data.message;
    } finally {
      return result;
    }
  };

  const removeConversation = async (conversationId) => {
    let serverError = { message: "" };
    try {
      const response = await api.deleteConversation(token, conversationId);

      // Update saved data user conversations
      setData((prevData) => ({
        user: {
          ...prevData.user,
          conversations: response.data.updatedConversations,
        },
      }));
    } catch (error) {
      serverError = error.response.data;
      console.log(serverError);
    } finally {
      return serverError;
    }
  };

  const saveMessage = async (conversationId, recipients, message) => {
    let result = { message: "", conversation: null };
    const request = {
      conversationId,
      recipients,
      message,
    };
    try {
      const response = await api.postMessage(token, request);
      result.conversation = response.data.updatedConversation;
    } catch (error) {
      result.message = error.response.data.message;
    } finally {
      return result;
    }
  };

  const getUser = useCallback(async () => {
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
    } finally {
      return serverError;
    }
  }, [setToken, token]);

  useEffect(() => {
    if (token) getUser();
  }, [token, getUser]);

  // Return loading message if we don't have token AND user data
  if (!data.user && token) {
    return "Loading...";
  }

  return (
    <AuthContext.Provider
      value={{
        data,
        signup,
        signin,
        signout,
        createContact,
        removeContact,
        getContact,
        createConversation,
        fetchConversations,
        getConversation,
        getUser,
        removeConversation,
        saveMessage,
      }}
      {...props}
    />
  );
};
