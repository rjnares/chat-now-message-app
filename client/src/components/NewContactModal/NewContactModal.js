import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContacts } from "../../contexts/ContactsProvider";

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();

  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>Create New Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </React.Fragment>
  );
};

export default NewContactModal;
