import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";



function Signup({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/signup", {
        email,
        password,
      });

      alert("Signup successful. Please login.");
      onSwitch();   // go to login page
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="authBox">
      <h2>Sign Up</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Create Account</button>

      <p onClick={onSwitch}>Already have account?</p>
    </div>
  );
}

export default Signup;
