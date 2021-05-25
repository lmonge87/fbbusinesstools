import { createContext } from 'react';

export const NotificationContext = createContext({
  showNotification: undefined,
  setShowNotification: () => undefined,
  message: { text: undefined, header: undefined },
  setMessage: () => undefined,
});
