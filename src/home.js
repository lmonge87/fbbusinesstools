import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GrFacebook } from "react-icons/gr";
import { FiFacebook } from "react-icons/fi";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FbTools from './pages/fbBusinessTools.js'
import AlertManager from './pages/alertManager.js'

export default function Homepage() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <GrFacebook />
        </Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link href="businessTools">Business Tools</Nav.Link>
            <Nav.Link href="alertManager">Alert Manager</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/businessTools">
          <FbTools />
        </Route>
        <Route path="/alertManager">
          <AlertManager />
        </Route>
      </Switch>
    </Router>
  );
}

const Home = () => {
  return <FiFacebook className="mainLogo" />;
};