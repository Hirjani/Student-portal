import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedToken && storedUser) {
      setLoading(false);
      setToken(storedToken);
      setUser(storedUser);
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateData = (token = "", user = "") => {
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    logout,
    updateData,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
