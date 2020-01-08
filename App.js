import React from "react";
import {
  View,
  Text,
  AppState,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image
} from "react-native";
import { Provider } from "react-redux";
import axios from "axios";
import { moderateScale } from "react-native-size-matters";
import firebase from "react-native-firebase";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import AsyncStorage from "@react-native-community/async-storage";
import AppNavigator from "./app/router";
import store from "./app/store";
import ErrorMessage from "./app/components/Error";
import { ModalLoading } from "./app/components/LoadScreen";
import colors from "./app/style/";
import ModalMessage from "./app/components/ModalMessage";

const resetPinMessage =
  "An email will been send to your linked email account. Please check your email to find the code to reset your pin.";
const resetPinApi = "http://167.99.90.138:8675/pinReset";
const styles = {
  textStyle: {
    color: colors.darkGrey,
    fontSize: 20
  },
  resetText: {
    color: "blue",
    textAlign: "center"
  },
  touchableStyle: {
    marginVertical: 30,
    alignItems: "center"
  }
};
export default class App extends React.Component {
  state = {
    pinMatched: false,
    showError: false,
    code: "",
    pin: "",
    errorMessage: "",
    loading: false,
    userLoggedIn: false,
    myId: "",
    appState: AppState.currentState
  };

  componentDidMount = async () => {
    //  NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
    AppState.addEventListener("change", this._handleAppStateChange);
    const pin = await AsyncStorage.getItem("pin");
    if (pin === null) {
      this.setState({ userLoggedIn: false });
      return;
    }
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    this.setState({ pin, myId: jsonObjectData.Id, userLoggedIn: true });
  };

  componentWillUnmount() {
    // NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log(nextAppState);
    this.setState({ appState: nextAppState, code: "" });
  };

  checkCode = code => {
    const { pin } = this.state;
    console.log(code, pin);
    if (code !== pin) {
      this.setState({
        showError: true,
        errorMessage: "Sorry your PIN's do not match, please try again.",
        code: ""
      });
    } else {
      this.setState({
        pinMatched: true,
        showError: false,
        errorMessage: ""
      });
    }
  };

  resetPin = () => {
    const { myId } = this.state;
    this.setState({ showModalMessage: false, loading: true });
    console.log(myId);
    axios
      .post(resetPinApi, {
        id: myId
      })
      .then(ressponse => {
        console.log(ressponse);
        this.logout();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          showError: true,
          errorMessage:
            "Something went wrong. Please try again. Or please check your internet connection"
        });
      });
  };

  logout = async () => {
    const { myId } = this.state;
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiRemove(keys);
    });
    this.setState({
      showModalMessage: false,
      loading: false,
      showError: false,
      errorMessage: "",
      userLoggedIn: false,
      pinMatched: false,
      pin: "",
      code: ""
    });
    firebase.auth().signOut();
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(myId)
    //   .update({
    //     phoneVerified: false,
    //     pinSet: false,
    //     userVerified: false
    //   })
    //   .then(async () => {
    //     this.setState({
    //       showModalMessage: false,
    //       loading: false,
    //       showError: false,
    //       errorMessage: "",
    //       userLoggedIn: false,
    //       pinMatched: false,
    //       pin: "",
    //       code: ""
    //     });
    //     await AsyncStorage.getAllKeys((err, keys) => {
    //       AsyncStorage.multiRemove(keys);
    //     });
    //     firebase.auth().signOut();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  renderPinInput = () => {
    const {
      code,
      showError,
      errorMessage,
      loading,
      showModalMessage
    } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
        enabled
        style={{
          flex: 1,
          padding: moderateScale(40),
          backgroundColor: "white"
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("./assets/path-logo.png")}
            style={{
              alignSelf: "center",
              color: colors.accent,
              marginBottom: moderateScale(20),
              marginTop: moderateScale(40)
            }}
          />
          <Text style={[styles.textStyle, { marginBottom: 40 }]}>
            Welcome back, please enter your PIN to access your account.
          </Text>
          <View style={{ alignSelf: "center" }}>
            <SmoothPinCodeInput
              textStyle={{
                fontSize: 24,
                color: "salmon"
              }}
              textStyleFocused={{
                color: "crimson"
              }}
              restrictToNumbers="true"
              autoFocus={true}
              value={code}
              onTextChange={code => this.setState({ code, showError: false })}
              onFulfill={codeInput => {
                this.checkCode(codeInput);
              }}
            />
          </View>
          {showError && (
            <ErrorMessage errorMessage={errorMessage} marginTop={10} />
          )}
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                flex: 1
              }
            ]}
            onPress={() => {
              this.setState({ showModalMessage: true });
            }}
          >
            <Text style={styles.resetText}>Reset Pin?</Text>
          </TouchableOpacity>
          {loading && <ModalLoading text="Please wait" />}
          {
            <ModalMessage
              text={resetPinMessage}
              isVisible={showModalMessage}
              showTwoButtons={true}
              backDropPress={() => {
                this.setState({ showModalMessage: false });
              }}
              onContinuePress={() => {
                this.resetPin();
                // firebase.auth().signOut();
              }}
            />
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  render() {
    const { pinMatched, userLoggedIn, appState, code, pin } = this.state;
    console.log(pinMatched, userLoggedIn, appState, code, pin, userLoggedIn);
    console.disableYellowBox = true;
    if (
      !userLoggedIn ||
      (pinMatched && appState === "active" && code === pin && userLoggedIn)
    ) {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }
    return this.renderPinInput();
  }
}
