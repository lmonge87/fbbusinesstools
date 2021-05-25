import React, { useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../../shared/contexts/notification/notification.context';
import { FbAuthContext } from '../../shared/contexts/fb-auth/fb-auth.context';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InterestFinder from './components/interest-finder/interests.js';
import ImageFinder from './components/image-finder/images.js';
import AssociatedImages from './components/used-images/used-images.js';
import { useStyles } from './facebook-tools.styles';
import axios from 'axios';

export default function FbTools() {
  const { root } = useStyles();
  const [businessAdAccounts, setBusinessAdAccounts] = useState(undefined);
  const { setShowNotification } = useContext(NotificationContext);
  const { accessToken } = useContext(FbAuthContext);

  useEffect(() => {
    accessToken &&
      axios
        .get(
          `https://graph.facebook.com/v10.0/me?fields=businesses&access_token=${accessToken}`
        )
        .then((response) => {
          const userBusiness = response.data.businesses.data[0].id;
          axios
            .get(
              `https://graph.facebook.com/v10.0/${userBusiness}/owned_ad_accounts?fields=name&limit=500&access_token=${accessToken}`
            )
            .then((response) => {
              setBusinessAdAccounts(
                response.data.data.sort((a, b) => (a.id > b.id ? 1 : -1))
              );
            });
        })
        .catch((err) => {
          console.log(err);
          setShowNotification(true);
        });
  }, [accessToken, setShowNotification]);

  return (
    <div className={root}>
      <Container fluid className='mt-3'>
        <Tabs transition={false}>
          <Tab eventKey='interests' title='Interest Finder'>
            <InterestFinder accessToken={accessToken} />
          </Tab>
          <Tab eventKey='images' title='Image Finder'>
            <ImageFinder
              accessToken={accessToken}
              selectOptions={businessAdAccounts}
            />
          </Tab>
          <Tab eventKey='used' title='Assets in Use'>
            <AssociatedImages
              accessToken={accessToken}
              selectOptions={businessAdAccounts}
            />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
