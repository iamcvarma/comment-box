import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import UserContext from "../store/UserContext";
const NavBar = ({ handleLogin, setUser }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full bg-sky-700 flex flex-col gap-1 justify-center items-center p-2  md:flex-row md:justify-evenly md:p-4 md:gap-3">
      <h1 className="text-3xl text-center font-bold text-white">
        Comment Box Demo
      </h1>
      <div>
        {user ? (
          <h3 className="font-bold text-white">Hi, {user.name}</h3>
        ) : (
          <p className="font-bold text-white">Log in to reply </p>
        )}
      </div>
      <div>
        {user ? (
          <button className="font-bold " onClick={() => setUser(null)}>LOG OUT</button>
        ) : (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={(res) => console.log(res)}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
