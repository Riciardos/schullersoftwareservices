import React, { useCallback, useState } from 'react';

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

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [googleAuth, setGoogleAuth] = useState({
    authenticated: false,
    authentication: { credential: '' },
  });

  const setAuth = useCallback((response: any) => {
    if (response.credential) {
      setGoogleAuth({ authenticated: true, authentication: response });
    }
  }, []);

  return <AuthContext.Provider value={{ ...googleAuth, setAuth }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
