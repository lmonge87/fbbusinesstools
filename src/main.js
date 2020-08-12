import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import InterestFinder from "./components/interests.js";
import ImageFinder from "./components/images.js";

export default function FbAPIConnect() {
  const [showFBButton, setShowFBButton] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

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
          setShowFBButton(true);
          window.FB.XFBML.parse();
        } else {
          setShowFBButton(false);
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
  }, []);

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xs={{ span: 4, offset: 8 }}>
          {showFBButton ? (
            <div
              className="fb-login-button"
              data-size="medium"
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
          <ImageFinder accessToken={accessToken} />
        </Tab>
      </Tabs>
    </Container>
  );
}
