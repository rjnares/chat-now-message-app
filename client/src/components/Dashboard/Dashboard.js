import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import OpenConversation from "../OpenConversation/OpenConversation";
import { useConversations } from "../../contexts/ConversationsProvider";
import NavBar from "../NavBar/NavBar";

const Dashboard = () => {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex flex-column">
      <NavBar />
      <div className="d-flex" style={{ height: "90vh" }}>
        <Sidebar />
        {selectedConversation && <OpenConversation />}
      </div>
    </div>
  );
};

export default Dashboard;
