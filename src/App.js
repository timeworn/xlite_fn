import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/core/styles';
import validate from 'validate.js';
import dotenv from 'dotenv';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import history from 'core/history/history';
import store from 'store';

dotenv.config();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes/>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
