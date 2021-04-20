import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import SignIn from "../SignIn/SignIn";
import useLocalStorage from "../../hooks/useLocalStorage";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  return id ? <Dashboard id={id} /> : <SignIn onIdSubmit={setId} />;
};

export default App;
