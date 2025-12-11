import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logOut();
    setMenuOpen(false); // close dropdown on logout
  };

  const menuItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/supplies">Pets & Supplies</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-listing">Add Listing</NavLink>
          </li>
          <li>
            <NavLink to="/my-listings">My Listings</NavLink>
          </li>
          <li>
            <NavLink to="/my-orders">My Orders</NavLink>
          </li>
        </>
      )}
    </>
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 px-5 shadow-sm">
      {/* LEFT: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          🐾 PawMart
        </Link>
      </div>

      {/* CENTER: Menu for large screens */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>

      {/* RIGHT: Login / Avatar */}
      <div className="flex-none">
        {!user ? (
          <div className="hidden lg:flex gap-3">
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/profile">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/MBtjqXQ/default-avatar.png"
                }
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                referrerPolicy="no-referrer"
                alt="Profile"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* DROPDOWN for small screens */}
      <div className="lg:hidden flex-none" ref={dropdownRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {menuOpen && (
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 absolute right-5 top-16 z-50">
            {menuItems}

            {user ? (
              <>
                <li>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
