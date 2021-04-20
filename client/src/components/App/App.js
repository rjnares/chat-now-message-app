import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import SignIn from "../SignIn/SignIn";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ContactsProvider } from "../../contexts/ContactsProvider";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  );

  return id ? dashboard : <SignIn onIdSubmit={setId} />;
};

export default App;
