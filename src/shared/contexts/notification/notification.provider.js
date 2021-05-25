import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

import { NotificationContext } from './notification.context';

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState({
    text: undefined,
    header: undefined,
  });

  return (
    <NotificationContext.Provider
      value={{
        setShowNotification,
        showNotification,
        setMessage,
      }}
    >
      <Toast
        style={{
          zIndex: 9999,
          position: 'fixed',
          top: 25,
          right: 50,
        }}
        onClose={() => setShowNotification(false)}
        show={showNotification}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className='mr-auto'>{message.header}</strong>
        </Toast.Header>
        <Toast.Body>{message.text}</Toast.Body>
      </Toast>
      {children}
    </NotificationContext.Provider>
  );
};
