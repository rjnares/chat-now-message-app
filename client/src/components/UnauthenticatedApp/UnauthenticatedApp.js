import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const UnauthenticatedApp = () => {
  const [isSignup, setIsSignup] = useState(true);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();

  const populateFields = () => {
    firstNameRef.current.value = "John";
    lastNameRef.current.value = "Doe";
    usernameRef.current.value = "johndoe";
    emailRef.current.value = "john.doe@email.com";
    passwordRef.current.value = "123456";
    verifyPasswordRef.current.value = "123456";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(firstNameRef.current.value);
    console.log(lastNameRef.current.value);
    console.log(usernameRef.current.value);
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    console.log(verifyPasswordRef.current.value);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card body style={{ width: "25rem" }}>
        <Card.Title
          className="d-flex justify-content-center"
          style={{ fontSize: "1.75rem" }}
        >
          Sign Up
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                required
                ref={firstNameRef}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                required
                ref={lastNameRef}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              required
              ref={usernameRef}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              required
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choose a password"
              required
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group controlId="formVerifyPassword">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              required
              ref={verifyPasswordRef}
            />
          </Form.Group>
          <Button block variant="primary" type="submit">
            Submit
          </Button>
          <Button
            block
            variant="primary"
            type="button"
            onClick={populateFields}
          >
            Populate Fields
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
