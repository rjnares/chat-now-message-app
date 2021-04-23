import React from "react";

import Dashboard from "../Dashboard/Dashboard";

import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const AuthenticatedApp = () => {
  return (
    <SocketProvider>
      <ContactsProvider>
        <ConversationsProvider>
          <Dashboard />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
};

export default AuthenticatedApp;
