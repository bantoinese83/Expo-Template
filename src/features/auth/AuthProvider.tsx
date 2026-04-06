import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { setSessionAccessToken } from "@/services/sessionToken";

import type { AuthContextValue, AuthProviderId, AuthUser, SignInCredentials } from "./auth.types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const initAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (isMounted.current) {
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

  const signIn = async (provider: AuthProviderId = "mock", credentials?: SignInCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
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
    } catch (err: unknown) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : "An error occurred during sign in");
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
    } catch (_err: unknown) {
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
      if (isMounted.current) {
        const trimmed = email.trim();
        const displayName = (name?.trim() || trimmed.split("@")[0] || "Member").slice(0, 80);
        setUser({ id: "2", email: trimmed, name: displayName });
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : "Failed to sign up");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signOut,
    signUp,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
