import { useState } from "react";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import "../styles/chat.css";


function Chat({ activeChat, updateChat }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...(activeChat?.messages || []),
      { sender: "user", text: input },
    ];

    updateChat(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/ask", {
        question: input,
      });

      updateChat([
        ...newMessages,
        { sender: "bot", text: res.data.answer },
      ]);
    } catch (err) {
      updateChat([
        ...newMessages,
        { sender: "bot", text: "⚠️ Server error" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <ChatWindow messages={activeChat.messages} loading={loading} />

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="தமிழில் கேளுங்கள்..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
