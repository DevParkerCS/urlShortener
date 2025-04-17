import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type User = {
  username: string;
  firstName: string;
  lastName: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkUserCookies = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/checkUserCookies",
        {},
        { withCredentials: true }
      );
      const user: User | null = response.data;
      if (user?.username) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // Add logic to check if user has session cookie
  useEffect(() => {
    checkUserCookies();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to get user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
