import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { initSession, onSessionExpired, setSessionAccessToken } from "@/services/sessionToken";

import type { AuthContextValue } from "./auth.types";

import { useMockAuth } from "./hooks/useMockAuth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Global Authentication Provider.
 * Modularized to separate UI context from provider-specific logic.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    isLoading: isAuthLoading,
    error: authError,
    signIn,
    signUp,
    signOut,
    setError,
  } = useMockAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initSession();
      setIsInitializing(false);
    };
    init();
  }, []);

  useEffect(() => {
    // Sync the token module with the current auth state
    setSessionAccessToken(user ? `template_mock_${user.id}` : null);
  }, [user]);

  useEffect(() => {
    // Listen for global session expiration events (e.g. from API interceptors)
    return onSessionExpired(() => {
      signOut();
    });
  }, [signOut]);

  const clearError = useCallback(() => setError(null), [setError]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading: isInitializing || isAuthLoading,
      error: authError,
      signIn,
      signOut,
      signUp,
      clearError,
    }),
    [user, isInitializing, isAuthLoading, authError, signIn, signOut, signUp, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access the current authentication state and actions.
 * @returns {AuthContextValue} Object containing user, isAuthenticated, loading state, and auth methods.
 * @throws {Error} If used outside of an AuthProvider.
 *
 * @example
 * const { user, signIn, signOut } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
