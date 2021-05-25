import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import { NotificationContext } from '../../contexts/notification/notification.context';
import { FbAuthContext } from '../../contexts/fb-auth/fb-auth.context';

export default function ErrorModalContent() {
  const { setError } = useContext(NotificationContext);
  const { accessToken } = useContext(FbAuthContext);

  return (
    <Alert
      className='mb-0'
      variant='danger'
      onClose={() => setError(false)}
      dismissible
    >
      <Alert.Heading>Oh snap!</Alert.Heading>
      {accessToken ? (
        <p>Please verify your input or refresh the application</p>
      ) : (
        <p>Please authenticate with your Facebook account to continue</p>
      )}
    </Alert>
  );
}
