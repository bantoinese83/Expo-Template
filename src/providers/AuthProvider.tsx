import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
// import * as Clerk from "@clerk/clerk-expo"; // Uncomment for Clerk
// import { supabase } from "../utils/supabase"; // Uncomment for Supabase

import { setSessionAccessToken } from "../services/sessionToken";

interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export type SignInCredentials = { email?: string; password?: string };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (
    provider?: "clerk" | "supabase" | "mock",
    credentials?: SignInCredentials
  ) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, pass: string, name?: string) => Promise<void>;
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

  useEffect(() => {
    if (user) {
      setSessionAccessToken(`template_mock_${user.id}`);
    } else {
      setSessionAccessToken(null);
    }
  }, [user]);

  const clearError = useCallback(() => setError(null), []);

  const signIn = async (provider = "mock", credentials?: SignInCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // Branching logic for future providers
      if (provider === "mock") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMounted.current) {
          const email = credentials?.email?.trim() || "dev@monarch.com";
          const localPart = email.includes("@") ? email.split("@")[0] : email;
          setUser({ id: "1", email, name: localPart || "Developer" });
        }
      } else if (provider === "clerk") {
        throw new Error("Clerk sign-in is not configured in this template yet.");
      } else if (provider === "supabase") {
        throw new Error("Supabase sign-in is not configured in this template yet.");
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

  const signUp = async (email: string, _pass: string, name?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Simulation: assume successful sign up logs you in
      if (isMounted.current) {
        const trimmed = email.trim();
        const displayName = (name?.trim() || trimmed.split("@")[0] || "Member").slice(0, 80);
        setUser({ id: "2", email: trimmed, name: displayName });
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
