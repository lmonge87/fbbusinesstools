import React, { useState, useContext, useEffect } from 'react';
import { FbAuthContext } from '../../shared/contexts/fb-auth/fb-auth.context';
import FacebookLogin from 'react-facebook-login';
import { FiFacebook } from 'react-icons/fi';
import { useStyles } from './home.styles';
import axios from 'axios';

const Home = () => {
  const { root } = useStyles();
  const { accessToken, setAccessToken } = useContext(FbAuthContext);
  const [fbActive, setFbActive] = useState(false);

  const handleFbStatusOnMount = async () => {
    if (accessToken) {
      const fbCheckResponse = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`
      );
      setFbActive(fbCheckResponse.data.data.is_valid);
    }
  };

  useEffect(() => {
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
      <div className='home-center'>
        <FiFacebook className='fb-logo' />
        {!fbActive && (
          <FacebookLogin
            appId='1045150769237017'
            callback={responseFacebook}
            icon='fa-facebook'
            size='small'
          />
        )}
      </div>
    </div>
  );
};

export default Home;
