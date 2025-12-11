import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-[80vh] flex mt-8 items-center justify-center bg-base-100">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="divider">OR</div>

        <button className="btn btn-outline w-full">Register with Google</button>
      </div>
    </div>
  );
}
