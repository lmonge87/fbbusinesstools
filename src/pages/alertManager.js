import React, { useState, useMemo, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useLocalStorage } from "web-api-hooks";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { RiCheckFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { AlertOptions } from "../data/alertOptions.json";
import { AdAccounts } from "../data/adAccountData.json";

const matchCheck = (acc, alerts) => {
  let matchCount = 0;
  for (let i = 0; i < acc.offConditions.length; i++) {
    if (
      alerts.some(
        (e) =>
          e.School === acc.offConditions[i].School &&
          e.Alert === acc.offConditions[i].Alert
      )
    ) {
      matchCount++;
      if (
        acc.backOnConditions.criteria &&
        alerts.some(
          (e) =>
            e.School === acc.backOnConditions.criteria.School &&
            e.Alert === acc.backOnConditions.criteria.Alert
        ) &&
        acc.currentStatus === "On"
      ) {
        acc.backOnConditions.goesBackOn = true;
      }
      acc.currentStatus = "Off";
    }
  }
  return matchCount;
};

const matchCheckDeep = (acc, alerts) => {
  let matchCount = 0;
  let cumulativeCount = 0;
  for (let i = 0; i < acc.offConditions.length; i++) {
    for (let x = 0; x < acc.offConditions[i].length; x++) {
      if (
        alerts.some(
          (e) =>
            e.School === acc.offConditions[i][x].School &&
            e.Alert === acc.offConditions[i][x].Alert
        )
      ) {
        matchCount++;
      }
    }
    if (matchCount === 2) {
      cumulativeCount++;
      if (
        acc.backOnConditions.criteria &&
        alerts.some(
          (e) =>
            e.School === acc.backOnConditions.criteria.School &&
            e.Alert === acc.backOnConditions.criteria.Alert
        ) &&
        acc.currentStatus === "On"
      ) {
        acc.backOnConditions.goesBackOn = true;
      }
      acc.currentStatus = "Off";
    }
    matchCount = 0;
  }
  return cumulativeCount;
};

const filterAccounts = (accounts, alerts) =>
  accounts.filter((f) =>
    f.offConditions.length > 2
      ? matchCheckDeep(f, alerts) >= f.minimumMatches
      : matchCheck(f, alerts) >= f.minimumMatches
  );

export default function AlertManager() {
  const accountsDeepCopy = JSON.parse(JSON.stringify(AdAccounts));

  const initialInputState = { School: "", Alert: "" };
  const [userInput, setUserInput] = useState(initialInputState);
  const [alertList, setAlertList] = useLocalStorage("alertList", []);
  const [checkedAccounts, setCheckedAccounts] = useLocalStorage(
    "checkedAccounts",
    []
  );
  const [adAccounts, setAdAccounts] = useState(accountsDeepCopy);
  const filteredAccounts = useMemo(
    () => filterAccounts(adAccounts, alertList),
    [alertList, adAccounts]
  );

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertList([...alertList, userInput]);
    setUserInput(initialInputState);
  };

  const handleChangeSchool = (e) => {
    e.persist();
    setUserInput((userInput) => ({ ...userInput, School: e.target.value }));
  };

  const handleChangeAlert = (e) => {
    e.persist();
    setUserInput((userInput) => ({ ...userInput, Alert: e.target.value }));
  };

  const handleAlertDelete = (alert) => {
    setAlertList(alertList.filter((f) => f !== alert));
    setAdAccounts(accountsDeepCopy);
  };

  const handleClear = () => {
    setAlertList([]);
    setAdAccounts(accountsDeepCopy);
    setCheckedAccounts([])
  };

  const handleCheck = (id) => {
    checkedAccounts.includes(id)
      ? setCheckedAccounts(checkedAccounts.filter((i) => i !== id))
      : setCheckedAccounts([...checkedAccounts, id]);
  };

  const openAccountFB = (id) => {
    const styledID = id.substring(4);
    window.open(
      `https://business.facebook.com/adsmanager/manage/campaigns?act=${styledID}&business_id=1783305341923072`,
      "_blank"
    );
  };

  useEffect(() => {
    if (alertList.length === 0) {
      setAdAccounts(accountsDeepCopy) 
      setCheckedAccounts([])};

    // eslint-disable-next-line
  }, [alertList]);

  return (
    <Card className="mainCardAlerts" text="white">
      <Card.Header>Alert Manager</Card.Header>
      <Card.Body>
        <Row className="mt-3">
          <Col xs="12">
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center">
                <Col md="4" xs="auto">
                  <Form.Label srOnly />
                  <Form.Control
                    className="mb-2"
                    as="select"
                    placeholder="School Name"
                    name="School Name"
                    value={userInput.School}
                    onChange={handleChangeSchool}
                  >
                    <option hidden>Select School Name</option>
                    {AlertOptions.Schools &&
                      AlertOptions.Schools.map((i, index) => (
                        <option key={index} value={i}>
                          {i}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
                <Col md="4" xs="auto">
                  <Form.Control
                    className="mb-2"
                    as="select"
                    placeholder="Alert Message"
                    name="Alert Message"
                    value={userInput.Alert}
                    onChange={handleChangeAlert}
                  >
                    <option hidden>Select Alert Type</option>
                    {AlertOptions.Alerts &&
                      AlertOptions.Alerts.map((i, index) => (
                        <option key={index} value={i}>
                          {i}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
                <Col xs="auto">
                  <Button
                    disabled={!(userInput.School && userInput.Alert)}
                    type="submit"
                    className="mb-2"
                  >
                    Add
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={handleClear}
                    disabled={!alertList.length}
                    className="mb-2"
                    variant="danger"
                  >
                    Clear Alerts
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Card bg="dark" text="white">
              <Card.Header>Alerts</Card.Header>
              <Card.Body className="cardContainer">
                <ListGroup>
                  {alertList &&
                    alertList.map((i, index) => (
                      <ListGroup.Item
                        className="d-flex"
                        variant="dark"
                        key={index}
                      >
                        <div className="flex-grow-1">
                          <Card.Subtitle>{i.School}</Card.Subtitle>
                          <Card.Text>
                            {i.Alert} <br />
                            <small className="text-muted">
                              {formattedDate}
                            </small>
                          </Card.Text>
                        </div>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleAlertDelete(i)}
                          className="text-right, align-top"
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Card bg="dark" text="white">
              <Card.Header>Affected Accounts</Card.Header>
              <Card.Body className="cardContainer">
                {filteredAccounts &&
                  filteredAccounts.map((i, index) => (
                    <Card
                      bg={
                        checkedAccounts.includes(i.id) ? "success" : "secondary"
                      }
                      text="white"
                      key={i.id}
                    >
                      <Card.Header className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <Card.Subtitle>
                            {i.name}, should be turned off.
                          </Card.Subtitle>
                          <Card.Text>
                            {i.backOnConditions.goesBackOn
                              ? `Those campaigns should be turned back on at: ${i.backOnConditions.time}`
                              : "Those campaigns should not go back on"}
                          </Card.Text>
                        </div>
                        <Button
                          variant="primary"
                          onClick={() => openAccountFB(i.id)}
                          className="text-right, align-top"
                        >
                          <GrFacebook />
                        </Button>
                        {checkedAccounts.includes(i.id) ? (
                          <Button
                            variant="outline-danger"
                            className="ml-2"
                            onClick={() => handleCheck(i.id)}
                          >
                            <CgClose />
                          </Button>
                        ) : (
                          <Button
                            variant="outline-success"
                            className="ml-2"
                            onClick={() => handleCheck(i.id)}
                          >
                            <RiCheckFill />
                          </Button>
                        )}
                      </Card.Header>
                    </Card>
                  ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
