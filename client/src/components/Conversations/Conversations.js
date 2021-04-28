import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

import { useAuth } from "../../contexts/AuthProvider";
import { useUser } from "../../contexts/UserProvider";

const Conversations = () => {
  const user = useUser();
  const { fetchConversations } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const [apiMessage, setApiMessage] = useState("");
  const [isApiError, setIsApiError] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setApiMessage("");
      setIsApiError(false);

      const result = await fetchConversations();

      if (result.message) {
        setApiMessage(`Error: ${result.message}`);
        setIsApiError(true);
      } else {
        setConversations(result.conversations);
      }
    };

    getConversations();
  }, [user, fetchConversations]);

  return (
    <ListGroup variant="flush">
      {apiMessage && (
        <Alert
          className="d-flex justify-content-center p-1"
          variant={isApiError ? "danger" : "success"}
        >
          {apiMessage}
        </Alert>
      )}
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          active={index === selectedConversationIndex}
          onClick={() => setSelectedConversationIndex(index)}
        >
          {conversation.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
