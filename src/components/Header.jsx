import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  const menuItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/supplies">Pets & Supplies</NavLink></li>

      {user && (
        <>
          <li><NavLink to="/add-listing">Add Listing</NavLink></li>
          <li><NavLink to="/my-listings">My Listings</NavLink></li>
          <li><NavLink to="/my-orders">My Orders</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* LEFT SIDE */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          🐾 PawMart
        </Link>
      </div>

      {/* MIDDLE (MENU) */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-none">

        {!user ? (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-sm">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL}
              className="w-10 h-10 rounded-full object-cover"
            />
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
