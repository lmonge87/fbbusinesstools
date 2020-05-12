import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function JSONParser() {
  const initialForm = {
    interest: "",
    token: "",
  };

  const [formData, updateFormData] = useState(initialForm);
  const [fetchedData, setFetcheData] = useState(undefined);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetcheData(await dataCall(formData.interest, formData.token));
  };

  const dataCall = async (interest, token) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/search?type=adinterest&q=[${interest}]&limit=10000&locale=en_US&access_token=${token}`
      );
      return response.data;
    } catch (err) {
      alert(err);
    }
  };

  const mapped =
    fetchedData &&
    fetchedData.data.map((i) => [
      [{ interests: [{ id: i.id, name: i.name }] }],
      { name: i.name},
      { audience: i.audience_size },
    ]);

  const strings =
    mapped && mapped.map((obj) => [JSON.stringify(obj[0]), obj[1].name, obj[2].audience]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Row noGutters>
                <Col>
                  <FormControl
                    type="text"
                    placeholder="Ad Interest"
                    name="interest"
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Auth Token"
                    name="token"
                    onChange={handleChange}
                  ></Form.Control>
                </Col>
                <Col>
                  <Button type="submit" value="Submit">
                    Get Data
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
        <Col lg="6"></Col>
      </Row>
      <Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID/Name</th>
              <th>Name</th>
              <th>Audience</th>
            </tr>
          </thead>
          <tbody>
            {strings &&
              strings.map((str, index) => (
                <tr key={index}>
                  <td>{str[0]}</td>
                  <td>{str[1]}</td>
                  <td>{str[2]}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
