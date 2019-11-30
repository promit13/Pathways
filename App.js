import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./app/router";
import store from "./app/store";
export default class App extends React.Component {
  // state = {
  //   user: null
  // };
  // componentDidMount = () => {
  //   this.createNotificationListeners();
  // };

  // componentWillUnmount() {
  //   this.notificationListener();
  //   this.notificationOpenedListener();
  //   this.messageListener();
  // }

  // createNotificationListeners = async () => {
  //   // Triggered when a particular notification has been received in foreground
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       const { title, body } = notification;
  //       console.log(title);
  //     });

  //   // If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       const { title, body } = notificationOpen.notification;
  //       console.log(title);
  //     });

  //   // If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     console.log(title);
  //   }

  //   // Triggered for data only payload in foreground
  //   this.messageListener = firebase.messaging().onMessage(message => {
  //     //process data message
  //     console.log(JSON.stringify(message));
  //   });
  // };

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
