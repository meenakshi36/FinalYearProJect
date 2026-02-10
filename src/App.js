import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  const [chat, setChat] = useState({
    messages: [],
  });

  if (!user) {
    return showSignup ? (
      <Signup
        onLogin={() => setUser(localStorage.getItem("token"))}
        onSwitch={() => setShowSignup(false)}
      />
    ) : (
      <Login
        onLogin={() => setUser(localStorage.getItem("token"))}
        onSwitch={() => setShowSignup(true)}
      />
    );
  }

  return (
    <Chat
      activeChat={chat}
      updateChat={(messages) => setChat({ messages })}
    />
  );
}

export default App;
