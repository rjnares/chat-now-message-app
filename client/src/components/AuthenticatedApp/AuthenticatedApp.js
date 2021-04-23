import React from "react";

import Dashboard from "../Dashboard/Dashboard";

import { useUser } from "../../contexts/UserProvider";

import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const AuthenticatedApp = () => {
  const user = useUser();

  return (
    <SocketProvider id={user._id}>
      <ContactsProvider>
        <ConversationsProvider id={user._id}>
          <Dashboard id={user._id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
};

export default AuthenticatedApp;
