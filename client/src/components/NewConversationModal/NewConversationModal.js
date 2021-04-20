import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>Create New Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </React.Fragment>
  );
};

export default NewConversationModal;
