import React, { createContext, useState } from "react";
import { HashRouter as Router,} from 'react-router-dom'
import Homepage from "./home.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export const GlobalContext = createContext();

const Provider = ({ children }) => {
  const [errorState, setErrorState] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const store = {
    error: [errorState, setErrorState],
    token: [accessToken, setAccessToken],
  };
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

function App() {
  return (
    <Provider>
      <div className="App">
        <Router>
        <Homepage />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
