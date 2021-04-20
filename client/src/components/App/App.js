import React from "react";
import SignIn from "../SignIn/SignIn";
import useLocalStorage from "../../hooks/useLocalStorage";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  return (
    <React.Fragment>
      {id ? <h3>ID: {id}</h3> : null}
      <SignIn onIdSubmit={setId} />
    </React.Fragment>
  );
};

export default App;
