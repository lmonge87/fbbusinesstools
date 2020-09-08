import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import ErrorModal from "../components/errorModal.js";
import InterestFinder from "../mainTools/interests.js";
import ImageFinder from "../mainTools/images.js";
import AssociatedImages from "../mainTools/usedImages.js";
import axios from "axios";

export default function FbTools(props) {
  const{ currentLocation } = props
  const [userBusiness, setUserBusiness] = useState(undefined);
  const [businessAdAccounts, setBusinessAdAccounts] = useState(undefined);
  const { error, token } = useContext(GlobalContext);
  const [, setErrorState] = error;
  const [accessToken, setAccessToken] = token;

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1045150769237017",
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });

      window.FB.AppEvents.logPageView();

      window.FB.getLoginStatus((response) => {
        if (response.status !== "connected") {
          window.FB.XFBML.parse();
        } else {
          setAccessToken(response.authResponse.accessToken);
        }
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, [currentLocation, setAccessToken]);

  useEffect(() => {
    accessToken &&
      axios
        .get(
          `https://graph.facebook.com/v8.0/me?fields=businesses&access_token=${accessToken}`
        )
        .then((response) => {
          setUserBusiness(response.data.businesses.data[0].id);
        })
        .catch((err) => {
          console.log(err);
          setErrorState(true);
        });
  }, [accessToken, setErrorState]);

  useEffect(() => {
    userBusiness &&
      axios
        .get(
          `https://graph.facebook.com/v8.0/${userBusiness}/owned_ad_accounts?fields=name&limit=500&access_token=${accessToken}`
        )
        .then((response) => {
          setBusinessAdAccounts(
            response.data.data.sort((a, b) => (a.id > b.id ? 1 : -1))
          );
        })
        .catch((err) => {
          console.log(err);
          setErrorState(true);
        });
  }, [userBusiness, accessToken, setErrorState]);

  return (
    <>
      <Container fluid className="mt-3">
        <Row className='mb-3'>
          <Col>
            {!accessToken ? (
              <div
                className="fb-login-button"
                data-size="small"
                data-button-type="login_with"
                data-layout="rounded"
                data-auto-logout-link="false"
                data-use-continue-as="false"
                data-width=""
              ></div>
            ) : (
              <Badge variant="success">Connected to FB</Badge>
            )}
          </Col>
        </Row>
        <Tabs transition={false}>
          <Tab eventKey="interests" title="Interest Finder">
            <InterestFinder accessToken={accessToken} />
          </Tab>
          <Tab eventKey="images" title="Image Finder">
            <ImageFinder
              accessToken={accessToken}
              selectOptions={businessAdAccounts}
            />
          </Tab>
          <Tab eventKey="used" title="Assets in Use">
            <AssociatedImages
              accessToken={accessToken}
              selectOptions={businessAdAccounts}
            />
          </Tab>
        </Tabs>
      </Container>
      <ErrorModal />
    </>
  );
}
