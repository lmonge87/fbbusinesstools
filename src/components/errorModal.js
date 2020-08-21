import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { GlobalContext } from "../App.js";

export default function ErrorModal() {
  const { error, token } = useContext(GlobalContext);
  const [errorState, setErrorState] = error;
  const [accessToken] = token;

  return (
    <Modal
      show={errorState}
      onHide={() => setErrorState(false)}
      backdrop="static"
      keyboard={false}
    >
      <Alert
        className="mb-0"
        variant="danger"
        onClose={() => setErrorState(false)}
        dismissible
      >
        <Alert.Heading>Oh snap!</Alert.Heading>
        {accessToken ? (
          <p>Please verify your input or refresh the application</p>
        ) : (
          <p>Please authenticate with your Facebook account to continue</p>
        )}
      </Alert>
    </Modal>
  );
}
