export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export type SignInCredentials = { email?: string; password?: string };

export type AuthProviderId = "clerk" | "supabase" | "mock";

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (provider?: AuthProviderId, credentials?: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, pass: string, name?: string) => Promise<void>;
  clearError: () => void;
}
