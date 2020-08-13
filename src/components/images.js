import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ImageFinder(props) {
  const { accessToken } = props;
  const [adAccountID, setAdAccountID] = useState("");
  const [fetchedImageData, setFetchedImageData] = useState(undefined);
  const [fetchedAccountName, setFetchedAccountName] = useState(undefined);
  const [userBusiness, setUserBusiness] = useState(undefined);
  const [businessAdAccounts, setBusinessAdAccounts] = useState(undefined);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dataCall(adAccountID);
    setAdAccountID("");
  };

  const handleClear = () => {
    setShowError(false);
    setFetchedImageData(undefined);
  };

  const dataCall = async (adAccountID) => {
    try {
      await axios
        .all([
          axios.get(
            `https://graph.facebook.com/v8.0/${adAccountID}/adimages?fields=name,id,hash&limit=1000&access_token=${accessToken}`
          ),
          axios.get(
            `https://graph.facebook.com/v8.0/${adAccountID}/?fields=name&access_token=${accessToken}`
          ),
        ])
        .then(
          axios.spread((firstRes, secRes) => {
            setFetchedImageData(firstRes.data.data);
            setFetchedAccountName(secRes.data.name);
          })
        );
    } catch (err) {
      setShowError(true);
    }
  };

  useEffect(() => {
    accessToken &&
      axios
        .get(
          `https://graph.facebook.com/v8.0/me?fields=businesses&access_token=${accessToken}`
        )
        .then((response) => {
          setUserBusiness(response.data.businesses.data[0].id);
        })
        .catch(() => {
          setShowError(true);
        });
  }, [accessToken]);

  useEffect(() => {
    userBusiness &&
      axios
        .get(
          `https://graph.facebook.com/v8.0/${userBusiness}/owned_ad_accounts?fields=name&limit=500&access_token=${accessToken}`
        )
        .then((response) => {
          setBusinessAdAccounts(response.data.data.sort((a, b) => (a.id > b.id) ? 1 : -1));
        })
        .catch(() => {
          setShowError(true);
        });
  }, [userBusiness, accessToken]);

  return (
    <>
      <Row className="mt-3">
        <Col xs="8">
          <Form onSubmit={handleSubmit}>
            <Form.Row className="align-items-center">
              <Col xs="4">
                <Form.Label srOnly>Ad Interest</Form.Label>
                <Form.Control
                  className="mb-2" as="select" placeholder="Ad Account ID"
                  name="accountID" value={adAccountID}
                  onChange=
                  {(e) => {
                    setAdAccountID(e.target.value);
                  }}>
                  <option hidden>Select Ad Account</option>
                  {businessAdAccounts &&
                    businessAdAccounts.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
              <Col xs="auto">
                <Button
                  disabled={!adAccountID.length}
                  type="submit"
                  className="mb-2"
                >
                  Get Data
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="danger" className="mb-2" onClick={handleClear}>
                  Clear
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
        {fetchedImageData && !fetchedImageData.length && (
          <Col>
            <h4>
              <Badge variant="danger">No Results</Badge>
            </h4>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          {fetchedImageData && (
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th colSpan="3">{fetchedAccountName}</th>
                </tr>
                <tr>
                  <th>Image Name</th>
                  <th>Hash</th>
                  <th>ID (Account + Hash)</th>
                </tr>
              </thead>
              <tbody>
                {fetchedImageData.map((item) => (
                  <tr key={uuidv4()}>
                    <td>{item.name}</td>
                    <td>{item.hash}</td>
                    <td>{item.id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Oh snap!</Alert.Heading>
          {accessToken ? (
            <p>
              Please confirm that you entered a valid Ad Account ID, refresh the
              application or contact the developer.
            </p>
          ) : (
            <p>Please authenticate with your Facebook account to continue</p>
          )}
        </Alert>
      )}
    </>
  );
}
