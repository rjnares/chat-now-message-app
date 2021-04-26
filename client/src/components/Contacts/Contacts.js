import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { useUser } from "../../contexts/UserProvider";

const Contacts = () => {
  const user = useUser();

  return (
    <ListGroup variant="flush">
      {user.contacts.map((contact) => (
        <ListGroup.Item key={contact}>{contact}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
