import React, { useContext, useMemo, useState } from 'react';
import { NotificationContext } from '../../../../../../shared/contexts/notification/notification.context';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { FaTrash } from 'react-icons/fa';
import { useStyles } from './accounts-settings-modal.styles';
import {
  dayOptions,
  hourOptions,
} from '../../utils/account-settings.constants';
import { formatTime, formatDays } from '../../utils/account-settings.helper';
import axios from 'axios';

const MultiSelectAlerts = ({ options, title, selections, setSelections }) => {
  const { multiSelectAlertsRoot } = useStyles();
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
    <div className={multiSelectAlertsRoot}>
      <Form.Label>{title}</Form.Label>
      <ListGroup className='selected-items-group' variant='flush'>
        {filteredSelection.map((alert, index) => (
          <ListGroup.Item
            className='selected-item'
            key={`selectedItem-${index}`}
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

const StartConfigSelector = ({ selections, setSelections }) => {
  const initialState = { time: 'Select Hour', day: [] };
  const [startTimeConfig, setStartTimeConfig] = useState(initialState);

  const { startConfigSelectorRoot } = useStyles();

  const checkBoxSelectHandler = (e) => {
    e.target.checked
      ? setStartTimeConfig({
          ...startTimeConfig,
          day: [...startTimeConfig.day, e.target.value],
        })
      : setStartTimeConfig({
          ...startTimeConfig,
          day: startTimeConfig.day.filter((day) => day !== e.target.value),
        });
  };

  const selectChangeHandler = (e) => {
    setStartTimeConfig({ ...startTimeConfig, time: parseInt(e.target.value) });
  };

  const handleSubmit = () => {
    setSelections([...selections, startTimeConfig]);
    setStartTimeConfig(initialState);
  };

  return (
    <div className={startConfigSelectorRoot}>
      <Card bg='secondary'>
        <Card.Header>Start Time Configuration</Card.Header>
        {selections.length > 0 && (
          <Card.Body>
            {selections.map((selection, index) => (
              <Row key={`selection-${index}`}>
                <Col xs='7'>
                  <span>
                    {formatDays(selection.day, dayOptions).toString()}
                  </span>
                </Col>
                <Col xs='3'>
                  <span>{formatTime(selection.time, hourOptions)}</span>
                </Col>
                <Col>
                  <FaTrash
                    onClick={() =>
                      setSelections(
                        selections.filter(
                          (select) =>
                            selection.day !== select.day &&
                            selection.time !== select.time
                        )
                      )
                    }
                  />
                </Col>
              </Row>
            ))}
          </Card.Body>
        )}
        <Card.Body>
          <Row className='controls-row'>
            <Col xs='8'>
              <div>Select Day(s)</div>
              {dayOptions.map((day, index) => (
                <Form.Check
                  key={`formCheck-${index}`}
                  inline
                  label={day.day}
                  id={`inline-${day.day}-1`}
                  onChange={checkBoxSelectHandler}
                  value={day.value}
                  checked={startTimeConfig.day.includes(day.value)}
                />
              ))}
            </Col>
            <Col xs='4'>
              <Form.Control
                as='select'
                size='sm'
                custom
                value={startTimeConfig.time}
                onChange={selectChangeHandler}
              >
                <option hidden>{'Select Hour'}</option>
                {hourOptions.map((option, index) => (
                  <option key={`option=${index}`} value={option.value}>
                    {option.hour}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant='primary'
                onClick={handleSubmit}
                disabled={
                  startTimeConfig.day.length === 0 ||
                  typeof startTimeConfig.time === 'string'
                }
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
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
  updateStartTimeConfig,
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
                  <MultiSelectAlerts
                    options={alertList}
                    title={'Primary Alerts'}
                    selections={accountState.mainPauseAlerts}
                    setSelections={updateAccountPrimaryAlerts}
                  />
                </Col>
                <Col xs='12'>
                  <MultiSelectAlerts
                    options={alertList}
                    title={'Secondary Alerts'}
                    selections={accountState.secondaryPauseAlerts}
                    setSelections={updateAccountSecondaryAlerts}
                  />
                </Col>
                <Col xs='12'>
                  <Form.Label srOnly />
                  <StartConfigSelector
                    selections={accountState.startTimeConfig}
                    setSelections={updateStartTimeConfig}
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
