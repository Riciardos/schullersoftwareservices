import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { apiClient } from '../api/client';
import { UserPreferences } from '../api/generated/schullerSoftwareServicesAPI.schemas';

interface UserProfileState {
  enableParticles: boolean;
  setEnableParticles: (value: boolean) => void;
}

const UserProfileContext = React.createContext<UserProfileState>({
  enableParticles: true,
  setEnableParticles: () => {},
});

function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const { authenticated } = useContext(AuthContext);
  const [enableParticles, setEnableParticlesLocal] = useState(true);
  useEffect(() => {
    if (!authenticated) return;
    apiClient<UserPreferences>({ url: '/user/preferences', method: 'GET' })
      .then((prefs) => {
        if (prefs.enableParticles != null) setEnableParticlesLocal(prefs.enableParticles);
      })
      .catch(() => {});
  }, [authenticated]);

  const setEnableParticles = useCallback((value: boolean) => {
    setEnableParticlesLocal(value);
    if (authenticated) {
      apiClient<void>({
        url: '/user/preferences',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: { enableParticles: value, theme: null },
      }).catch(() => {});
    }
  }, [authenticated]);

  return (
    <UserProfileContext.Provider value={{ enableParticles, setEnableParticles }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export { UserProfileContext };
export default UserProfileProvider;
