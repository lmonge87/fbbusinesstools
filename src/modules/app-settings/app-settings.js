import React, { useState, useEffect, useContext } from 'react';
import { FbAuthContext } from '../../shared/contexts/fb-auth/fb-auth.context';
import FacebookLogin from 'react-facebook-login';
import AlertSettings from './components/alerts-settings/alerts-settings';
import AccountSettings from './components/accounts-settings/accounts-settings';
import { useStyles } from './app-settings.styles';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Settings = () => {
  const { root } = useStyles();
  const { accessToken, setAccessToken } = useContext(FbAuthContext);
  const [fbActive, setFbActive] = useState(false);
  const [alertList, setAlertList] = useState([]);
  const [accountList, setAccountList] = useState([]);

  const getAlertData = async () => {
    const alertData = await axios.get('api/alerts');
    setAlertList(alertData.data);
  };

  const getAccountData = async () => {
    const accountData = await axios.get('api/accounts');
    setAccountList(accountData.data);
  };

  const handleFbStatusOnMount = async () => {
    const currentTokenInServer = await axios.get('/api/getfbtoken');
    console.log(accessToken === currentTokenInServer);
    if (accessToken === currentTokenInServer) {
      const fbCheckResponse = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`
      );
      setFbActive(fbCheckResponse.data.data.is_valid);
    }
    setFbActive(false);
  };

  useEffect(() => {
    getAlertData();
    getAccountData();
    handleFbStatusOnMount();
    // eslint-disable-next-line
  }, []);

  const responseFacebook = async (response) => {
    if (response) {
      const longLiveToken = await axios.post('/api/setfbtoken', {
        accessToken: response.accessToken,
      });
      const parsedResponse = JSON.parse(longLiveToken.config.data);
      setAccessToken(parsedResponse.accessToken);
      setFbActive(parsedResponse.accessToken ? true : false);
    } else {
      setAccessToken(null);
    }
  };

  return (
    <div className={root}>
      <Card className='mainCardAlerts' bg='dark' text='white'>
        <Card.Header as='h4'>Settings</Card.Header>
        <Card.Body>
          <Row className='mt-3'>
            <Col xs='12'>
              {fbActive ? (
                <span>Facebook Login Active</span>
              ) : (
                <FacebookLogin
                  appId='1045150769237017'
                  callback={responseFacebook}
                  icon='fa-facebook'
                  size='small'
                />
              )}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg='6' xs='12'>
              <AlertSettings
                alertData={alertList}
                alertDataSetter={setAlertList}
                alertDataGetter={getAlertData}
              />
            </Col>
            <Col lg='6' xs='12'>
              <AccountSettings
                alertList={alertList}
                accountData={accountList}
                accountDataSetter={setAccountList}
                accountDataGetter={getAccountData}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Settings;
