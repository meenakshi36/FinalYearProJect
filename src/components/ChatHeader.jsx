function ChatHeader({ title }) {
  return (
    <div className="chatHeader">
      <div className="chatTitle">{title}</div>
      <div className="chatStatus">AI Assistant</div>
    </div>
  );
}

export default ChatHeader;
