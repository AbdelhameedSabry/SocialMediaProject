import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const image = localStorage.getItem("image");

    setUser({ ...user, token, role, image });
  }, []);

  const saveUserData = (userData) => {
    setUser({
      role: userData.user.roleId.toString(),
      token: userData.token,
      image: userData.user.profilePicture,
    });

    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.user.roleId);
    localStorage.setItem("userName", userData.user.username);
    localStorage.setItem("userId", userData.user.id);
    localStorage.setItem("image", userData.user.profilePicture);
  };

  const logOut = () => {
    setUser({});

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("image");

    navigate("/");
  };

  const value = {
    user,
    saveUserData,
    logOut,
    search,
    setSearch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
