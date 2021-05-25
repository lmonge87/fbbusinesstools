import React from 'react';
import { useSessionStorage } from '../../hooks/use-session-storage/use-session-storage';
import { FbAuthContext } from './fb-auth.context';

export const FbAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useSessionStorage(
    'accessToken',
    undefined
  );

  return (
    <FbAuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </FbAuthContext.Provider>
  );
};
