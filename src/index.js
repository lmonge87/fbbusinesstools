import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';

import { NotificationProvider } from './shared/contexts/notification/notification.provider';
import { FbAuthProvider } from './shared/contexts/fb-auth/fb-auth.provider';
import Router from './shared/router/router';
import Header from './shared/components/header/header';
import * as serviceWorker from './serviceWorker';
import { theme } from './shared/style/theming/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './shared/style/index.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <FbAuthProvider>
        <Header />
        <NotificationProvider>
          <Router />
        </NotificationProvider>
      </FbAuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
