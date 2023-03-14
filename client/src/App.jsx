import React, { useState, useEffect } from "react";
import CommentContainer from "./components/CommentContainer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import NavBar from "./components/NavBar";
import UserContext from "./store/UserContext";

function App() {
  const [user, setUser] = useState(null);
  
  const handleLogin = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, picture, email } = decoded;
    const newUser = {
      email: email,
      name: name,
      picture: picture,
    };
    const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUser(data);
  };

  return (
    <div className="w-full bg-white md:w-[70%] mx-auto">
      <div className="flex flex-col w-full ">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <UserContext.Provider value={{ user }}>
            <NavBar handleLogin={handleLogin} setUser={setUser} />
            <CommentContainer />
          </UserContext.Provider>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
