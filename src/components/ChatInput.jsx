import React, { useState } from "react";

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="தமிழில் கேள்வி கேளுங்கள்..."
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        அனுப்பு
      </button>
    </div>
  );
}

export default ChatInput;
