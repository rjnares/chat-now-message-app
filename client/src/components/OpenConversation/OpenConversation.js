import React, { useState, useCallback, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useConversations } from "../../contexts/ConversationsProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { useUser } from "../../contexts/UserProvider";

const OpenConversation = ({ conversationId }) => {
  const user = useUser();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [text, setText] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [isApiError, setIsApiError] = useState(false);

  const { getConversation } = useAuth();

  useEffect(() => {
    const fetchConversation = async () => {
      setApiMessage("");
      setIsApiError(false);

      const result = await getConversation(conversationId);

      if (result.message) {
        setIsApiError(true);
        setApiMessage(`Error: ${result.message}`);
      } else {
        console.log(result.conversation);
        setSelectedConversation(result.conversation);
      }
    };

    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId, getConversation]);

  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

  const { sendMessage } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);

    // sendMessage(
    //   selectedConversation.recipients.map((recipient) => recipient.id),
    //   text
    // );
    setText("");
  };

  return selectedConversation ? (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.sender === user.email
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.sender === user.email
                      ? "bg-primary text-white"
                      : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.sender === user.email ? "text-right" : ""
                  }`}
                >
                  {message.sender === user.email ? "You" : message.sender}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  ) : (
    "Loading..."
  );
};

export default OpenConversation;
