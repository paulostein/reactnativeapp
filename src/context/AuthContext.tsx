import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  username: string;
}

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const CACHE_KEY = "user_data";
const EXPIRATION_TIME = 60 * 60 * 1000;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkCache = async () => {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { username, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();

        if (now - timestamp < EXPIRATION_TIME) {
          setUser({ username });
        } else {
          await AsyncStorage.removeItem(CACHE_KEY);
        }
      }
    };

    checkCache();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === "user" && password === "1234") {
      const timestamp = new Date().getTime();

      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ username, timestamp })
      );

      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(CACHE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
