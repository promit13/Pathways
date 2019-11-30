import React from "react";
import { ActivityIndicator, View } from "react-native";
import firebase from "react-native-firebase";

export default class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    user: null,
    currentUser: null,
    loading: true
  };

  componentDidMount() {
    this.handleConnectivityChange();
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  handleConnectivityChange = () => {
    this.authSubscription = firebase.auth().onAuthStateChanged(currentUser => {
      console.log(currentUser);
      if (currentUser === null) {
        return this.setState({ loading: false, currentUser });
      }
      this.getUserDetails(currentUser);
    });
  };

  getUserDetails = currentUser => {
    console.log(currentUser._user.uid);
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser._user.uid)
      .onSnapshot(response => {
        const data = response.data();
        console.log(data);
        this.setState({ currentUser, loading: false, user: data });
      });
  };

  renderComponent = () => {
    const { currentUser, loading, user } = this.state;
    if (loading) return <ActivityIndicator />;
    if (currentUser) {
      console.log(currentUser);
      if (user === undefined) return <ActivityIndicator />;
      const { phoneVerified, pinSet } = user;
      if (!phoneVerified) {
        return this.props.navigation.navigate("RegisterMobile", {
          currentUser,
          user
        });
      }
      if (!pinSet) {
        return this.props.navigation.navigate("RegisterPin", {
          currentUser,
          user
        });
      }
      this.props.navigation.navigate("SignedIn", { currentUser });
    } else {
      this.props.navigation.navigate("SignedOut");
    }
  };

  render() {
    return <View>{this.renderComponent()}</View>;
  }
}
