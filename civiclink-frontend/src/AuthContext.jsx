// AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On initial load, read login state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(stored);
  }, []);

  const login = () => {
    localStorage.setItem('isLoggedIn', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
