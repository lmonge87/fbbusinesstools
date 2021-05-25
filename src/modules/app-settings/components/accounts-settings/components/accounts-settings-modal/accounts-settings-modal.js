import React, { useContext, useMemo } from 'react';
import { NotificationContext } from '../../../../../../shared/contexts/notification/notification.context';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrash } from 'react-icons/fa';
import { useStyles } from './accounts-settings-modal.styles';
import axios from 'axios';

const MultiSelect = ({ options, title, selections, setSelections }) => {
  const { multiSelectRoot } = useStyles();
  const filteredSelection = useMemo(
    () => options.filter((option) => selections.includes(option._id)),
    [options, selections]
  );
  const filteredOptions = useMemo(
    () => options.filter((option) => !selections.includes(option._id)),
    [options, selections]
  );

  const changeHandler = (e) => {
    if (!selections.includes(e.target.value))
      setSelections([...selections, e.target.value]);
  };

  return (
    <div className={multiSelectRoot}>
      <Form.Label>{title}</Form.Label>
      <ListGroup className='selected-alerts-group' variant='flush'>
        {filteredSelection.map((alert, index) => (
          <ListGroup.Item
            className='selected-alert'
            key={`selectedAlert-${index}`}
            variant='dark'
          >
            <span>{`${alert.schoolID}/${alert.reason}`}</span>
            <FaTrash
              onClick={() =>
                setSelections(
                  selections.filter((selection) => selection !== alert._id)
                )
              }
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form.Group>
        <Form.Control
          as='select'
          size='sm'
          value={''}
          custom
          onChange={changeHandler}
        >
          <option
            hidden
          >{`${filteredSelection.length} selected option(s)`}</option>
          {filteredOptions.map((alertOption, index) => (
            <option key={`option=${index}`} value={alertOption._id}>
              {`${alertOption.schoolID}/${alertOption.reason}`}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

const AccountSettingsModal = ({
  alertList,
  addModalState,
  setAddModalState,
  updateId,
  setUpdateId,
  getAccountData,
  accountState,
  setAccountState,
  updateAccountPrimaryAlerts,
  updateAccountSecondaryAlerts,
}) => {
  const { root } = useStyles();
  const { setShowNotification, setMessage } = useContext(NotificationContext);

  const handleAddAccount = () => {
    try {
      axios.post('api/account', accountState).then((response) => {
        if (response.status === 200) {
          setShowNotification(true);
          setMessage({ text: 'Account Created', header: 'Done!' });
          setAddModalState(false);
          getAccountData();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateAccount = () => {
    try {
      axios
        .patch('api/updateAccount', accountState, { params: { id: updateId } })
        .then((response) => {
          if (response.status === 200) {
            setShowNotification(true);
            setMessage({ text: 'Account Updated', header: 'Updated!' });
            setAddModalState(false);
            getAccountData();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAccountState({
      ...accountState,
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
        <Modal.Title>{updateId ? 'Update Account' : 'Add Account'}</Modal.Title>
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
                    type='string'
                    placeholder='Name'
                    value={accountState.name}
                    name='name'
                    onChange={handleChange}
                  />
                </Col>
                <Col xs='12'>
                  <Form.Label srOnly />
                  <Form.Control
                    className='mb-2'
                    type='string'
                    placeholder='FB Account ID'
                    value={accountState.fbId}
                    name='fbId'
                    onChange={handleChange}
                  />
                </Col>
                <Col xs='12'>
                  <MultiSelect
                    options={alertList}
                    title={'Primary Alerts'}
                    selections={accountState.mainPauseAlerts}
                    setSelections={updateAccountPrimaryAlerts}
                  />
                </Col>
                <Col xs='12'>
                  <MultiSelect
                    options={alertList}
                    title={'Secondary Alerts'}
                    selections={accountState.secondaryPauseAlerts}
                    setSelections={updateAccountSecondaryAlerts}
                  />
                </Col>
                <Col xs='12'>
                  <Form.Label srOnly />
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='Start Time'
                    name='startTime'
                    value={accountState.startTime || ''}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs='12'>
                  <Form.Control
                    className='mb-2'
                    as='select'
                    name='startException'
                    value={
                      accountState.startException
                        ? accountState.startException._id
                        : ''
                    }
                    onChange={handleChange}
                  >
                    <option value={null}>No Start Exception</option>
                    {alertList.map((alert, index) => (
                      <option key={`option=${index}`} value={alert._id}>
                        {`${alert.schoolID}/${alert.reason}`}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={updateId ? handleUpdateAccount : handleAddAccount}
          disabled={!accountState.name}
        >
          {updateId ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountSettingsModal;
