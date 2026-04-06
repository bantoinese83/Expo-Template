import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
// import * as Clerk from "@clerk/clerk-expo"; // Uncomment for Clerk
// import { supabase } from "../utils/supabase"; // Uncomment for Supabase

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
  error: string | null;
  signIn: (provider?: "clerk" | "supabase" | "mock") => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const initAuth = async () => {
      try {
        // Simulation of checking session
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (isMounted.current) {
          // Check local storage or provider session here
          // setUser({ id: "1", email: "dev@monarch.com", name: "Modern Developer" });
          setIsLoading(false);
        }
      } catch (_err) {
        if (isMounted.current) {
          setError("Failed to initialize authentication");
          setIsLoading(false);
        }
      }
    };

    initAuth();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const signIn = async (provider = "mock") => {
    setIsLoading(true);
    setError(null);
    try {
      // Branching logic for future providers
      if (provider === "mock") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMounted.current) {
          setUser({ id: "1", email: "dev@monarch.com", name: "Modern Developer" });
        }
      } else if (provider === "clerk") {
        // Implement Clerk sign in
      } else if (provider === "supabase") {
        // Implement Supabase sign in
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.message || "An error occurred during sign in");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isMounted.current) {
        setUser(null);
      }
    } catch (_err: any) {
      if (isMounted.current) {
        setError("Failed to sign out");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const signUp = async (email: string, _pass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Signing up...", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Simulation: assume successful sign up logs you in
      if (isMounted.current) {
        setUser({ id: "2", email, name: email.split("@")[0] });
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.message || "Failed to sign up");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        signIn,
        signOut,
        signUp,
        clearError,
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
