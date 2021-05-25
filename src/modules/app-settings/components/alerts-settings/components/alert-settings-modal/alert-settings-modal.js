import React, { useContext } from 'react';
import { NotificationContext } from '../../../../../../shared/contexts/notification/notification.context';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useStyles } from './alert-settings-modal.styles';
import axios from 'axios';

const AlertSettingsModal = ({
  addModalState,
  setAddModalState,
  setUpdateId,
  alertState,
  setAlertState,
  updateId,
  getAlertData,
}) => {
  const { root } = useStyles();
  const { setShowNotification, setMessage } = useContext(NotificationContext);

  const handleAddAlert = () => {
    try {
      axios.post('api/alert', alertState).then((response) => {
        if (response.status === 200) {
          setShowNotification(true);
          setMessage({ text: 'Alert Created', header: 'Done!' });
          setAddModalState(false);
          getAlertData();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateAlert = () => {
    try {
      axios
        .patch('api/updateAlert', alertState, { params: { id: updateId } })
        .then((response) => {
          if (response.status === 200) {
            setShowNotification(true);
            setMessage({ text: 'Alert Updated', header: 'Updated!' });
            setAddModalState(false);
            getAlertData();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAlertState({
      ...alertState,
      [e.target.name]: value,
    });
  };

  const handleHide = () => {
    setUpdateId('');
    setAddModalState(false);
  };

  return (
    <Modal
      className={root}
      show={addModalState}
      onHide={handleHide}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{updateId ? 'Update Alert' : 'Add Alert'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='mt-3'>
          <Col xs='12'>
            <Form>
              <Form.Row className='align-items-center'>
                <Col xs='12'>
                  <Form.Label srOnly />
                  <Form.Control
                    className='mb-2'
                    type='number'
                    placeholder='School ID'
                    value={alertState.schoolID || ''}
                    name='schoolID'
                    onChange={handleChange}
                  />
                </Col>
                <Col xs='12'>
                  <Form.Label srOnly />
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='Reason'
                    name='reason'
                    value={alertState.reason || ''}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs='12'>
                  <Form.Label srOnly />
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='Status'
                    name='status'
                    value={alertState.status || ''}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={
            !alertState.reason || !alertState.schoolID || !alertState.status
          }
          variant='primary'
          onClick={updateId ? handleUpdateAlert : handleAddAlert}
        >
          {updateId ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertSettingsModal;
