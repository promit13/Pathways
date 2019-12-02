import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./app/router";
import store from "./app/store";
export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
