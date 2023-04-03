import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../axios";
import { getCookie } from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = async () => {
    window.location.href = "http://localhost:3000/login/auth/microsoft";
  };

  const logout = () => {
    document.cookie = "token=; path=/;";
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
