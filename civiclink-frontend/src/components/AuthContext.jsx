import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole]   = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole  = localStorage.getItem("role");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role",userRole);
    setRole(userRole);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}