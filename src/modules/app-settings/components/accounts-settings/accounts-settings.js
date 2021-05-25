import React, { useState, useContext } from 'react';
import { NotificationContext } from '../../../../shared/contexts/notification/notification.context';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountSettingsModal from './components/accounts-settings-modal/accounts-settings-modal';
import { useStyles } from './accounts-settings.styles';
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaPlusCircle,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import axios from 'axios';

const AccountSettings = ({
  alertList,
  accountData,
  accountDataSetter,
  accountDataGetter,
}) => {
  const initialState = {
    name: '',
    fbId: '',
    mainPauseAlerts: [],
    secondaryPauseAlerts: [],
    startTime: '',
    startException: null,
  };

  const { setShowNotification, setMessage } = useContext(NotificationContext);
  const { root } = useStyles();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [addModalState, setAddModalState] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [accountState, setAccountState] = useState(initialState);

  const updateAccountPrimaryAlerts = (alerts) => {
    setAccountState({
      ...accountState,
      mainPauseAlerts: alerts,
    });
  };

  const updateAccountSecondaryAlerts = (alerts) => {
    setAccountState({
      ...accountState,
      secondaryPauseAlerts: alerts,
    });
  };

  const getIds = (arr) => {
    return arr.map((arrItem) => arrItem._id);
  };

  const handleUpdate = (acct, id) => {
    setUpdateId(id);
    setAccountState({
      ...accountState,
      name: acct.name,
      fbId: acct.fbId,
      mainPauseAlerts: getIds(acct.mainPauseAlerts),
      secondaryPauseAlerts: getIds(acct.secondaryPauseAlerts),
      startTime: acct.startTime,
      startException: acct.startException,
    });
    setAddModalState(true);
  };

  const handleAccountDelete = (accountID) => {
    try {
      axios
        .delete('api/deleteAccount', { params: { id: accountID } })
        .then((response) => {
          if (response.status === 200) {
            accountDataSetter(accountData.filter((f) => f._id !== accountID));
            setShowNotification(true);
            setMessage({ text: 'Account Deleted', header: 'Deleted!' });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={root}>
      <Card bg='dark' text='white'>
        <Card.Header as='h5' className='card-header'>
          <span>Accounts</span>
          <Button
            variant='outline-success'
            onClick={() => {
              setAccountState(initialState);
              setAddModalState(true);
            }}
          >
            <FaPlusCircle />
          </Button>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {accountData &&
              accountData.map((acct, index) => (
                <Card bg='dark' key={`account-${index}`}>
                  <Accordion.Toggle
                    as={Card.Header}
                    className='accordion-header'
                    eventKey={index + 1}
                  >
                    <span>Account Name: {acct.name}</span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body>
                      <span>
                        FB Account ID: <strong>{acct.fbId}</strong>
                      </span>
                      <span>Primary Pause Alerts:</span>
                      <ListGroup variant='flush'>
                        {acct.mainPauseAlerts.map((alert, index) => (
                          <ListGroup.Item
                            className={'alert-details'}
                            variant='dark'
                            key={`alert-${index}`}
                          >
                            <span>School ID: {alert.schoolID}</span>
                            <span>Reason: {alert.reason}</span>
                            <span>Status: {alert.status}</span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <span>Secondary Pause Alerts:</span>
                      <ListGroup variant='flush'>
                        {acct.secondaryPauseAlerts.length ? (
                          acct.secondaryPauseAlerts.map((alert, index) => (
                            <ListGroup.Item
                              className={'alert-details'}
                              variant='dark'
                              key={`alert-${index}`}
                            >
                              <span>School ID: {alert.schoolID}</span>
                              <span>Reason: {alert.reason}</span>
                              <span>Status: {alert.status}</span>
                            </ListGroup.Item>
                          ))
                        ) : (
                          <span>
                            <strong>No Secondary Alerts Found</strong>
                          </span>
                        )}
                      </ListGroup>
                      <span>
                        Restart Time: <strong>{acct.startTime}</strong>
                      </span>
                      <span>Restart Exception:</span>
                      {acct.startException ? (
                        <ListGroup variant='flush'>
                          <ListGroup.Item
                            className={'alert-details'}
                            variant='dark'
                            key={`alert-${index}`}
                          >
                            <span>
                              School ID: {acct.startException.schoolID}
                            </span>
                            <span>Reason: {acct.startException.reason}</span>
                            <span>Status: {acct.startException.status}</span>
                          </ListGroup.Item>
                        </ListGroup>
                      ) : (
                        <span>
                          <strong>No restart exceptions</strong>
                        </span>
                      )}
                      <div className='button-container'>
                        <Button
                          variant='outline-primary'
                          onClick={() => handleUpdate(acct, acct._id)}
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
                              onClick={() => handleAccountDelete(acct._id)}
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
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        </Card.Body>
      </Card>
      {addModalState && (
        <AccountSettingsModal
          alertList={alertList}
          addModalState={addModalState}
          setAddModalState={setAddModalState}
          setUpdateId={setUpdateId}
          updateId={updateId}
          getAccountData={accountDataGetter}
          accountState={accountState}
          setAccountState={setAccountState}
          updateAccountPrimaryAlerts={updateAccountPrimaryAlerts}
          updateAccountSecondaryAlerts={updateAccountSecondaryAlerts}
        />
      )}
    </div>
  );
};

export default AccountSettings;
