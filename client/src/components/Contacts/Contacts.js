import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { useUser } from "../../contexts/UserProvider";
import { useAuth } from "../../contexts/AuthProvider";

const Contacts = () => {
  const user = useUser();
  const { removeContact } = useAuth();

  const [selectedContactIndex, setSelectedContactIndex] = useState(-1);

  const [removeMessage, setRemoveMessage] = useState("");
  const [isRemoveError, setIsRemoveError] = useState(false);

  const handleRemoveContact = async (contact) => {
    setRemoveMessage("");
    setIsRemoveError(false);

    const result = await removeContact(contact);

    if (result.message) {
      // Will want to display this message to user
      setRemoveMessage(`Error: ${result.message}`);
      setIsRemoveError(true);

      // For now, we'll just log error and message
      // TODO: create modal showing contact info with delete
      // contact button and display error/success message
      console.log(`Remove Error: ${result.message}`);
    } else {
      setRemoveMessage(`Success: '${contact}' has been removed from contacts`);
      // For now, we'll just log error and message
      // TODO: create modal showing contact info with delete
      // contact button and display error/success message
      console.log(`Success: '${contact}' has been removed from contacts`);
    }
  };

  return (
    <ListGroup variant="flush">
      {user.contacts.map((contact, index) => (
        <ListGroup.Item
          key={contact}
          action
          active={index === selectedContactIndex}
          onClick={() => setSelectedContactIndex(index)}
        >
          <div className="d-flex align-items-center">
            {contact}
            {index === selectedContactIndex && (
              <div
                id={contact}
                tabIndex={index}
                role="button"
                aria-pressed="false"
                className="ml-auto p-0 pl-1 pr-1 border-0 btn btn-danger"
                onClick={() => handleRemoveContact(contact)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-x-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
