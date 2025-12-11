import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register
  const register = async (email, password, displayName, photoURL) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName,
      photoURL:
        photoURL ||
        "https://i.ibb.co/MBtjqXQ/default-avatar.png"
    });
    return res.user;
  };

  // Email login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, loginWithGoogle, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
