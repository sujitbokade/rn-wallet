import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load userId from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedUserEmail = await AsyncStorage.getItem("email");
      if (storedUserId && storedUserEmail) {
        setUserId(storedUserId);
        setEmail(storedUserEmail);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (id, email) => {
    await AsyncStorage.setItem("userId", id);
    await AsyncStorage.setItem("email", email);
    setUserId(id);
    setEmail(email);
    router.replace("/(home)");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("email");
    setUserId(null);
    setEmail(null);
    router.replace("/(auth)/sign-in");
  };

  return (
    <AuthContext.Provider value={{ userId, email, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
