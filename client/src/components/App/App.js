import React, { useState } from "react";
import SignIn from "../SignIn/SignIn";

const App = () => {
  const [id, setId] = useState("");

  return (
    <React.Fragment>
      {id ? <h3>ID: {id}</h3> : null}
      <SignIn onIdSubmit={setId} />
    </React.Fragment>
  );
};

export default App;
