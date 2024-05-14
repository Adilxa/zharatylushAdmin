// useAuth.js
import { useEffect, useState } from "react";
import $api from "../http/Api";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getUser = async (uid) => {
    try {
      const response = await $api.get(`/user/${uid}`);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error("Error fetching user:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminKey");
    setAuth(false); // Update isAuth state when logging out
  };

  const login = async (email, password) => {
    try {
      const res = await $api.post("user/auth", {
        email,
        password,
        role: "admin",
      });
      localStorage.setItem("adminKey", res.data.id);
      setAuth(true); // Update isAuth state after successful login
      return res.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const id = localStorage.getItem("adminKey");
        if (id) {
          const userExist = await getUser(id);
          if (userExist) {
            setAuth(true);
            setAuthData(userExist);
            setLoading(false);
          } else {
            logout();
          }
        } else {
          setAuth(false);
          setAuthData(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  return { isAuth, authData, isLoading, login, logout }; // Provide login and logout functions
};

export default useAuth;
