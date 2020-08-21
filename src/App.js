import React, { createContext, useState } from "react";
import FbAPIConnect from "./main.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <FbAPIConnect />
      </div>
    </Provider>
  );
}

export default App;
