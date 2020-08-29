import React, { useState, useContext, useMemo } from "react";
import { GlobalContext } from "../App.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import axios from "axios";

const formatPushRoutes = (data, accessToken) =>
  data &&
  data.map(
    (i) =>
      `https://graph.facebook.com/v8.0/${i.id}?status=${i.status}&access_token=${accessToken}`
  );

export default function InputForm(props) {
  const {
    variant,
    dataType,
    searchFields,
    dataSetter,
    labelSetter,
    selectOptions,
    savingRoutes,
    savedStatus,
    setSavedStatus,
    setEditedRow,
  } = props;

  const [userInput, setUserInput] = useState(undefined);
  const [noResults, setNoResults] = useState(false);

  const { error, token } = useContext(GlobalContext);
  const [, setErrorState] = error;
  const [accessToken] = token;

  const formattedRoutes = useMemo(
    () => formatPushRoutes(savingRoutes, accessToken),
    [savingRoutes, accessToken]
  );

  const dataRoutes = {
    interests: `https://graph.facebook.com/search?type=adinterest&q=[${userInput}]&limit=10000&locale=en_US&access_token=${accessToken}`,
    images: `https://graph.facebook.com/v8.0/${userInput}/adimages?fields=${searchFields}&limit=1000&access_token=${accessToken}`,
    campaigns: `https://graph.facebook.com/v8.0/${userInput}/campaigns?fields=${searchFields}&limit=1000&access_token=${accessToken}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dataSetter(await dataCall());
    setUserInput("");
    if (dataType === "interests") {
      labelSetter(userInput);
    }
  };

  const handleClear = () => {
    setErrorState(false);
    dataSetter([]);
    setNoResults(false);
    setEditedRow([])
    setSavedStatus(false);
  };

  const handleChangeText = (e) => {
    setUserInput(e.target.value);
    dataSetter(undefined);
  };

  const handleChangeSelect = (e) => {
    setUserInput(e.target.value);
    let option = e.nativeEvent.target.selectedIndex;
    labelSetter(e.nativeEvent.target[option].text);
    dataSetter(undefined);
    setEditedRow([])
    setSavedStatus(false);
  };

  const handleSave = () => {
    saveData(formattedRoutes);
    setSavedStatus(true);
  };

  const dataCall = async () => {
    try {
      const response = await axios.get(dataRoutes[dataType]);
      !response.data.data.length ? setNoResults(true) : setNoResults(false);
      return response.data.data;
    } catch (err) {
      setErrorState(true);
    }
  };

  const dataPush = async (route) => {
    try {
      await axios.post(route);
    } catch (err) {
      setErrorState(true);
    }
  };

  const saveData = (data) => {
    data && data.forEach((i) => dataPush(i));
  };

  return (
    <>
      <Row className="mt-3">
        <Col xs="12">
          <Form onSubmit={handleSubmit}>
            <Form.Row className="align-items-center">
              <Col md="4" xs="auto">
                <Form.Label srOnly />
                {variant === "select" ? (
                  <Form.Control
                    className="mb-2"
                    as="select"
                    placeholder="Ad Account ID"
                    name="adAccount"
                    value={userInput}
                    onChange={handleChangeSelect}
                  >
                    <option hidden>Select Ad Account</option>
                    {selectOptions &&
                      selectOptions.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Ad Interest"
                    name="interest"
                    value={userInput || ""}
                    onChange={handleChangeText}
                  />
                )}
              </Col>
              <Col xs="auto">
                <Button disabled={!userInput} type="submit" className="mb-2">
                  Get Data
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="danger" className="mb-2" onClick={handleClear}>
                  Clear
                </Button>
              </Col>
              {noResults && (
                <Col xs="auto">
                  <h4>
                    <Badge variant="danger">No Results</Badge>
                  </h4>
                </Col>
              )}
              {formattedRoutes && formattedRoutes.length ? (
                <Col xs="auto" lg={{ span: "auto", offset: "5" }}>
                  {savedStatus ? (
                    <Button variant="success" className="mb-2">
                      Saved!
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      className="mb-2"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  )}
                </Col>
              ) : null}
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
