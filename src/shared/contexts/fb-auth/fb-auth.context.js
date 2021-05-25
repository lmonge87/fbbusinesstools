import { createContext } from 'react';

export const FbAuthContext = createContext({
  accessToken: undefined,
  setAccessToken: () => undefined,
});
