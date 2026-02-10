function Sidebar({ chats, activeId, setActiveId, createNewChat }) {
  return (
    <div className="sidebar">

      <button className="newChatBtn" onClick={createNewChat}>
        + New Chat
      </button>

      <div className="chatList">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={
              activeId === chat.id
                ? "chatItem active"
                : "chatItem"
            }
            onClick={() => setActiveId(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>

      <button
  className="logoutBtn"
  onClick={() => {
    localStorage.removeItem("token");
    window.location.reload();
  }}
>
  Logout
</button>


    </div>
  );
}

export default Sidebar;
