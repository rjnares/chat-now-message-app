import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import SignIn from "../SignIn/SignIn";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <SignIn onIdSubmit={setId} />;
};

export default App;
