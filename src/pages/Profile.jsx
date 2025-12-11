import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg text-center">
        <img
          src={user?.photoURL || "https://i.pravatar.cc/150?img=3"}
          alt={user?.displayName || "User"}
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user?.displayName || "User"}</h2>
        <p className="text-gray-600 mb-4">{user?.email}</p>
        <button onClick={handleLogout} className="btn btn-error w-full">
          Logout
        </button>
      </div>
    </div>
  );
}
