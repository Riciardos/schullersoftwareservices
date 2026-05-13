import React, { useCallback, useEffect, useState } from 'react';
import { setAuthToken } from '../api/client';

const SESSION_KEY = 'auth_credential';

interface AuthState {
  authenticated: boolean;
  authentication: { credential: string };
  setAuth: (response: any) => void;
}

const AuthContext = React.createContext<AuthState>({
  authenticated: false,
  authentication: { credential: '' },
  setAuth: () => {},
});

const isTokenValid = (credential: string): boolean => {
  try {
    const payload = JSON.parse(atob(credential.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [googleAuth, setGoogleAuth] = useState({
    authenticated: false,
    authentication: { credential: '' },
  });

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored && isTokenValid(stored)) {
      setAuthToken(stored);
      setGoogleAuth({ authenticated: true, authentication: { credential: stored } });
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const setAuth = useCallback((response: any) => {
    if (response.credential) {
      sessionStorage.setItem(SESSION_KEY, response.credential);
      setAuthToken(response.credential);
      setGoogleAuth({ authenticated: true, authentication: response });
    }
  }, []);

  return <AuthContext.Provider value={{ ...googleAuth, setAuth }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
