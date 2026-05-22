import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, name, role) => {
    const result = await createUserWithEmailAndPassword(
      auth, email, password
    );
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    });
    return result;
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      register,
      login,
      logout,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}