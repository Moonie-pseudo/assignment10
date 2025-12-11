import React from "react";

export default function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    photoURL: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg text-center">
        <img
          src={user.photoURL}
          alt={user.name}
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <button className="btn btn-error w-full">Logout</button>
      </div>
    </div>
  );
}
