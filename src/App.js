import React from "react";
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import MainContainer from './MainContainer';
import store from './redux/store';

function App() {
  return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
