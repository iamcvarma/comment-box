import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import UserContext from "../store/UserContext";
const NavBar = ({ handleLogin,setUser }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full bg-emerald-300 flex flex-col gap-1 justify-center items-center p-2  md:flex-row md:justify-evenly md:p-4 md:gap-3">
      <h1 className="text-3xl text-center font-bold text-green-800">Comment Box Demo</h1>
      <div>{user ? <h3 className="font-bold text-green-900">Hi, {user.name}</h3> : <p className="font-bold text-green-900">Log in to reply </p>}</div>
      <div>
        {user ? (
          <button onClick={() => setUser(null)}>Log out</button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(res)=>console.log(res)} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
