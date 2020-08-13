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

export default function InterestFinder(props) {
  const { accessToken } = props;
  const [interest, setInterest] = useState("");
  const [fetchedData, setFetchedData] = useState(undefined);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetchedData(await dataCall(interest));
    setInterest("");
  };

  const handleClear = () => {
    setShowError(false);
    setFetchedData(undefined);
  };

  const dataCall = async (interest) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/search?type=adinterest&q=[${interest}]&limit=10000&locale=en_US&access_token=${accessToken}`
      );
      return response.data.data;
    } catch (err) {
      setShowError(true);
    }
  };

  const mapped =
    fetchedData &&
    fetchedData.map((i) => [
      [{ interests: [{ id: i.id, name: i.name }] }],
      { name: i.name },
      { audience: i.audience_size },
    ]);

  const strings =
    mapped &&
    mapped.map((obj) => [JSON.stringify(obj[0]), obj[1].name, obj[2].audience]);

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
                  placeholder="Ad Interest"
                  name="interest"
                  value={interest}
                  onChange={(e) => {
                    setInterest(e.target.value);
                  }}
                />
              </Col>
              <Col xs="auto">
                <Button
                  disabled={!interest.length}
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
          {fetchedData && (
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID/Name</th>
                  <th>Name</th>
                  <th>Audience</th>
                </tr>
              </thead>
              <tbody>
                {strings &&
                  strings.map((str) => (
                    <tr key={uuidv4()}>
                      <td>{str[0]}</td>
                      <td>{str[1]}</td>
                      <td>{str[2]}</td>
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
            <p>Please verify your input or refresh the application</p>
          ) : (
            <p>Please authenticate with your Facebook account to continue</p>
          )}
        </Alert>
      )}
    </>
  );
}
