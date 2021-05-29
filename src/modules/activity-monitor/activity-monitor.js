import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { GrRefresh } from 'react-icons/gr';
import axios from 'axios';
import { useStyles } from './activity-monitor.styles';

export default function ActivityMonitor() {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [activeAccounts, setActiveAccounts] = useState([]);

  const { root } = useStyles();

  const getAlertData = async () => {
    const alertData = await axios.get('api/activeAlerts');
    setActiveAlerts(alertData.data);
  };

  const getAccountData = async () => {
    const accountData = await axios.get('api/activeAccounts');
    setActiveAccounts(accountData.data);
  };

  const handleRefreshActivity = () => {
    getAlertData();
    getAccountData();
  };

  useEffect(() => {
    getAlertData();
    getAccountData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={root}>
      <Card bg={'dark'} text='white'>
        <Card.Header>
          <Row className='d-flex justify-content-between'>
            <Col xs='auto'>
              <h4>Activity Monitor</h4>
            </Col>
            <Col xs='auto'>
              <Row>
                <Col className='px-1'>
                  <Button
                    onClick={handleRefreshActivity}
                    className='mb-2'
                    variant='info'
                  >
                    <GrRefresh />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg='6' xs='12'>
              <Card bg='dark' text='white'>
                <Card.Header as='h5'>Alerts Recieved</Card.Header>
                <Card.Body>
                  {activeAlerts &&
                    activeAlerts.map((i) => (
                      <ListGroup
                        className='d-flex'
                        variant='light'
                        text='dark'
                        key={i._id}
                      >
                        <ListGroup.Item
                          variant='light'
                          className='alert-list-item flex-column'
                        >
                          <span>
                            <strong>School ID: </strong>
                            {i.schoolID}
                          </span>
                          <span>
                            <strong>Reason: </strong>
                            {i.reason}
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col lg='6' xs='12'>
              <Card bg='dark' text='white'>
                <Card.Header as='h5'>Pausing Accounts</Card.Header>
                <Card.Body>
                  <Accordion>
                    {activeAccounts &&
                      activeAccounts.map((acct, index) => (
                        <Card bg='light' text='dark' key={`account-${index}`}>
                          <Accordion.Toggle
                            as={Card.Header}
                            className='accordion-header'
                            eventKey={index + 1}
                          >
                            <Card.Subtitle>
                              Account Name: {acct.name}
                            </Card.Subtitle>
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey={index + 1}>
                            <Card.Body className='flex-column'>
                              <span>
                                FB Account ID: <strong>{acct.fbId}</strong>
                              </span>
                              <span>Campaigns:</span>
                              <ListGroup variant='flush'>
                                {acct.campaigns.map((campaign, index) => (
                                  <ListGroup.Item
                                    className={'campaign-details'}
                                    variant='dark'
                                    key={`campaign-${index}`}
                                  >
                                    <span>Campaign Name: {campaign.name}</span>
                                    <span>ID: {campaign.id}</span>
                                    <span>
                                      Current Status: {campaign.status}
                                    </span>
                                    <span>
                                      New Status: {campaign.newStatus}
                                    </span>
                                    <span>
                                      Update Status: {campaign.updateStatus}
                                    </span>
                                    <span>
                                      Update Time: {campaign.updateTime || '-'}
                                    </span>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
