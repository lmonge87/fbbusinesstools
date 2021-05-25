import React, { useState, useContext } from 'react';
import { NotificationContext } from '../../../../shared/contexts/notification/notification.context';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import AlertSettingsModal from './components/alert-settings-modal/alert-settings-modal';
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaPlusCircle,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import axios from 'axios';

const AlertSettings = ({ alertData, alertDataSetter, alertDataGetter }) => {
  const initialState = {
    schoolID: undefined,
    reason: undefined,
    status: undefined,
  };
  const { setShowNotification, setMessage } = useContext(NotificationContext);
  const [alertState, setAlertState] = useState(initialState);
  const [addModalState, setAddModalState] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleUpdate = (id, currentState) => {
    setUpdateId(id);
    setAlertState(currentState);
    setAddModalState(true);
  };

  const handleAlertDelete = (alertID) => {
    try {
      axios
        .delete('api/deleteAlert', { params: { id: alertID } })
        .then((response) => {
          if (response.status === 200) {
            alertDataSetter(alertData.filter((f) => f._id !== alertID));
            setShowNotification(true);
            setMessage({ text: 'Alert Deleted', header: 'Deleted!' });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card bg='dark' text='white'>
        <Card.Header as='h5' className='card-header'>
          <span>Alerts</span>
          <Button
            variant='outline-success'
            onClick={() => {
              setAlertState(initialState);
              setAddModalState(true);
            }}
          >
            <FaPlusCircle />
          </Button>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {alertData &&
              alertData.map((i, index) => (
                <Card bg='dark' key={`alert-${index}`}>
                  <Accordion.Toggle
                    as={Card.Header}
                    className='accordion-header'
                    eventKey={index + 1}
                  >
                    <span>School ID: {i.schoolID}</span>
                    <span>Reason: {i.reason}</span>
                    <span>Status: {i.status}</span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body className='button-container'>
                      <Button
                        variant='outline-primary'
                        onClick={() =>
                          handleUpdate(i._id, {
                            reason: i.reason,
                            status: i.status,
                            schoolID: i.schoolID,
                          })
                        }
                      >
                        <FaRegEdit />
                      </Button>
                      {deleteConfirm ? (
                        <>
                          <Button
                            variant='outline-danger'
                            onClick={() => setDeleteConfirm(false)}
                          >
                            <FaTimes />
                          </Button>
                          <Button
                            variant='outline-success'
                            onClick={() => handleAlertDelete(i._id)}
                          >
                            <FaCheck />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant='outline-danger'
                          onClick={() => setDeleteConfirm(true)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        </Card.Body>
      </Card>
      {addModalState && (
        <AlertSettingsModal
          addModalState={addModalState}
          setAddModalState={setAddModalState}
          setUpdateId={setUpdateId}
          alertState={alertState}
          setAlertState={setAlertState}
          updateId={updateId}
          getAlertData={alertDataGetter}
        />
      )}
    </>
  );
};

export default AlertSettings;
