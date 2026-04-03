import React, { createContext, useContext, useEffect, useState } from "react";
// import * as Clerk from "@clerk/clerk-expo"; // Uncomment to use Clerk
// import { supabase } from "../utils/supabase"; // Uncomment to use Supabase

interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (provider?: "clerk" | "supabase" | "mock") => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // MOCK AUTH INITIALIZATION
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Here you would check Clerk.useUser() or supabase.auth.getSession()
        // For now, we simulate a check
        setTimeout(() => {
          setIsLoading(false);
          // setUser({ id: "1", email: "dev@monarch.com", name: "Modern Developer" });
        }, 1000);
      } catch (e) {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const signIn = async (provider = "mock") => {
    setIsLoading(true);
    // Simulate sign in
    setTimeout(() => {
      setUser({ id: "1", email: "dev@monarch.com", name: "Modern Developer" });
      setIsLoading(false);
    }, 500);
  };

  const signOut = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
    }, 500);
  };

  const signUp = async (email: string, pass: string) => {
    console.log("Signing up...", email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
