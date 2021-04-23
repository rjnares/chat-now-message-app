import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import OpenConversation from "../OpenConversation/OpenConversation";
import { useConversations } from "../../contexts/ConversationsProvider";

const Dashboard = () => {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
