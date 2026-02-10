import React, { useEffect, useRef } from "react";
import Message from "./Message";

function ChatWindow({ messages, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}

      {loading && (
        <div className="typing">AI பதில் தயாரிக்கிறது...</div>
      )}

      <div ref={endRef} />
    </div>
  );
}

export default ChatWindow;
