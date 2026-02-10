import { useState } from "react";
import axios from "axios";
import "../styles/chat.css";
import ChatHeader from "./ChatHeader";

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
    } catch {
      updateChat([
        ...newMessages,
        { sender: "bot", text: "⚠️ Server error" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatContainer">

      <ChatHeader title="Conversation" />

      {/* Messages */}
      <div className="chatBody">
        <div className="chat-center">

          {activeChat.messages.map((msg, i) => (
            <div
              key={i}
              className={msg.sender === "user" ? "msg user" : "msg bot"}
            >
              {msg.text}
            </div>
          ))}

          {loading && <div className="msg bot">Thinking...</div>}

        </div>
      </div>

      {/* Input */}
      <div className="inputDock">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="தமிழில் கேளுங்கள்..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default Chat;
