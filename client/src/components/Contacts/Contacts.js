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
          <div className="d-flex align-items-center">
            {contact}
            {index === selectedContactIndex && (
              <div
                id={contact}
                tabIndex={index}
                role="button"
                aria-pressed="false"
                className="ml-auto p-0 pl-1 pr-1 border-0 btn btn-danger"
                onClick={() => console.log("Button working")}
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
