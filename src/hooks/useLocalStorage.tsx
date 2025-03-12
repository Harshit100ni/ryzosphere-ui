import { useEffect } from "react";

export const useLocalStorage = () => {
  const AUTH_KEY = "isAuthenticated";
  const USERNAME_KEY = "username";
  const PASSWORD_KEY = "password";

  const isAuthenticated = localStorage.getItem(AUTH_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  const password = localStorage.getItem(PASSWORD_KEY);

  const initializeAuthData = () => {
    localStorage.setItem(AUTH_KEY, "false");
    localStorage.setItem(USERNAME_KEY, "admin");
    localStorage.setItem(PASSWORD_KEY, "admin");
  };

  const updateAuthenticationStatus = (status: string) => {
    localStorage.setItem(AUTH_KEY, status);
  };

  useEffect(() => {
    initializeAuthData();
  }, []);

  return {
    isAuthenticated,
    username,
    password,
    initializeAuthData,
    updateAuthenticationStatus,
  };
};
