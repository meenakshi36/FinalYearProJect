import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {

  // ===============================
  // STATE
  // ===============================
  const [chats, setChats] = useState([
    { id: 1, title: "New Chat", messages: [] },
  ]);

  const [activeId, setActiveId] = useState(1);

  const token = localStorage.getItem("token");

  const activeChat = chats.find(c => c.id === activeId);


  // ===============================
  // LOGIN CHECK (SAFE)
  // ===============================
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);


  // ===============================
  // LOAD CHATS FROM DB
  // ===============================
if (!token) {
  return null;  // stop rendering App
}


  // ===============================
  // CREATE NEW CHAT
  // ===============================
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats([...chats, newChat]);
    setActiveId(newChat.id);
  };


  // ===============================
  // UPDATE CHAT + SAVE
  // ===============================
  const updateChatMessages = (messages) => {

    const updatedChats = chats.map(chat => {

      if (chat.id !== activeId) return chat;

      let title = chat.title;

      if (title === "New Chat" && messages.length > 0) {
        const first = messages.find(m => m.sender === "user");
        if (first) title = first.text.substring(0, 30);
      }

      return { ...chat, messages, title };
    });

    setChats(updatedChats);

    const currentChat = updatedChats.find(c => c.id === activeId);

    axios.post("http://localhost:5000/chat/save", {
      email: token,
      chatId: currentChat.id,
      messages: currentChat.messages,
      title: currentChat.title
    });
  };


  // ===============================
  // UI
  // ===============================
  return (
    <div className="app">

      <Sidebar
        chats={chats}
        activeId={activeId}
        setActiveId={setActiveId}
        createNewChat={createNewChat}
      />

      <div style={{ flex: 1 }}>
        <Chat
          activeChat={activeChat}
          updateChat={updateChatMessages}
        />
      </div>

    </div>
  );
}

export default App;
