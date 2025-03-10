import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import App from './App';

const AppWrapper = () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
};

export default AppWrapper;
