import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import SignIn from "../SignIn/SignIn";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

import { useUser } from "../../contexts/UserProvider";

import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";
import UnauthenticatedApp from "../UnauthenticatedApp/UnauthenticatedApp";

const App = () => {
  const user = useUser();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  // const [id, setId] = useLocalStorage("id");

  // const dashboard = (
  //   <SocketProvider id={id}>
  //     <ContactsProvider>
  //       <ConversationsProvider id={id}>
  //         <Dashboard id={id} />
  //       </ConversationsProvider>
  //     </ContactsProvider>
  //   </SocketProvider>
  // );

  // return id ? dashboard : <SignIn onIdSubmit={setId} />;
};

export default App;
