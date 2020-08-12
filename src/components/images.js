import React, { useState } from "react";
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
  const [fetchedData, setFetchedData] = useState(undefined);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetchedData(await dataCall(adAccountID));
    setAdAccountID("");
  };

  const handleClear = () => {
    setShowError(false);
    setFetchedData(undefined);
  };

  const dataCall = async (adAccountID) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v8.0/act_${adAccountID}/adimages?fields=name,id,hash&limit=1000&access_token=${accessToken}`
      );
      return response.data.data;
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <>
      <Row className="mt-3">
        <Col xs="8">
          <Form onSubmit={handleSubmit}>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Label srOnly>Ad Interest</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Ad Account ID"
                  name="accountID"
                  value={adAccountID}
                  onChange={(e) => {
                    setAdAccountID(e.target.value);
                  }}
                />
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
        {fetchedData && !fetchedData.length && (
          <Col>
            <h4>
              <Badge variant="danger">No Results</Badge>
            </h4>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Image Name</th>
                <th>Hash</th>
                <th>ID (Account + Hash)</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData &&
                fetchedData.map((item) => (
                  <tr key={uuidv4()}>
                    <td>{item.name}</td>
                    <td>{item.hash}</td>
                    <td>{item.id}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Oh snap!</Alert.Heading>
          {accessToken ? (
            <p>Please confirm that you entered a valid Ad Account ID or refresh the application</p>
          ) : (
            <p>Please authenticate with your Facebook account to continue</p>
          )}
        </Alert>
      )}
    </>
  );
}
