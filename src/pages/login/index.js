import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim()) {
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify({ username }));
      // Redirect to home
      router.push("/");
    } else {
      alert("Please enter a username!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "8px", marginBottom: "16px" }}
      />
      <button onClick={handleLogin} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Login
      </button>
    </div>
  );
}
