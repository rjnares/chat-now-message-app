import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { useUser } from "../../contexts/UserProvider";

const Contacts = () => {
  const user = useUser();

  const [selectedContactIndex, setSelectedContactIndex] = useState(-1);

  return (
    <ListGroup variant="flush">
      {user.contacts.map((contact, index) => (
        <ListGroup.Item
          key={contact}
          action
          active={index === selectedContactIndex}
          onClick={() => setSelectedContactIndex(index)}
        >
          {contact}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
