import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { GrRefresh } from 'react-icons/gr';
import axios from 'axios';

export default function AlertManager() {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [activeAccounts, setActiveAccounts] = useState([]);

  const getAlertData = async () => {
    const alertData = await axios.get('api/activeAlerts');
    setActiveAlerts(alertData.data);
  };

  const getAccountData = async () => {
    const accountData = await axios.get('api/activeAccounts');
    setActiveAccounts(accountData.data);
  };

  const handlePullMessages = () => {
    getAlertData();
    getAccountData();
  };

  useEffect(() => {
    getAlertData();
    getAccountData();
    // eslint-disable-next-line
  }, []);

  return (
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
                  onClick={handlePullMessages}
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
              <Card.Header as='h5'>Alerts Added</Card.Header>
              <Card.Body>
                <ListGroup>
                  {activeAlerts &&
                    activeAlerts.map((i) => (
                      <ListGroup.Item
                        className='d-flex align-items-center'
                        variant='dark'
                        key={i._id}
                      >
                        <div className='flex-grow-1'>
                          <Card.Subtitle>{i.schoolID}</Card.Subtitle>
                          <Card.Text>{i.reason}</Card.Text>
                        </div>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg='6' xs='12'>
            <Card bg='dark' text='white'>
              <Card.Header as='h5'>Pausing Accounts</Card.Header>
              <Card.Body>
                <ListGroup>
                  {activeAccounts &&
                    activeAccounts.map((i) => (
                      <ListGroup.Item
                        className='d-flex align-items-center'
                        variant='dark'
                        key={i._id}
                      >
                        <div className='flex-grow-1'>
                          <Card.Subtitle>{i.name}</Card.Subtitle>
                          <Card.Text>
                            <span>{i.fbId}</span>
                          </Card.Text>
                        </div>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
