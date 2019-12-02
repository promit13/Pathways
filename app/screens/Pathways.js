import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  Image,
  AppState,
  ScrollView,
  Linking,
  KeyboardAvoidingView
} from "react-native";
import firebase from "react-native-firebase";
// import firebase from "../utils/firebase";
import axios from "axios";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import colors from "../style";
import ErrorMessage from "../components/Error";
import { ModalLoading } from "../components/LoadScreen";
import ModalMessage from "../components/ModalMessage";

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

const resetPinMessage =
  "An email will been send to your linked email account. Please check your email to find the code to reset your pin.";
export default class Pathways extends Component {
  state = {
    pin: "",
    pinMatched: false,
    code: "",
    showError: false,
    errorMessage: "",
    myId: "",
    loading: false,
    showModalMessage: false,
    appState: AppState.currentState
  };
  componentDidMount = async () => {
    AppState.addEventListener("change", this._handleAppStateChange);
    const pin = await AsyncStorage.getItem("pin");
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    this.setState({ pin, myId: jsonObjectData.Id });
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log(nextAppState);
    this.setState({ appState: nextAppState, code: "" });

    // if (
    //   this.state.appState.match(/inactive|background/) &&
    //   nextAppState === "active"
    // ) {
    //   console.log("App has come to the foreground!");
    // }
    // this.setState({ appState: nextAppState });
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
          errorMessage: "Something went wrong. Please try again."
        });
      });
  };

  logout = () => {
    const { myId } = this.state;
    firebase
      .firestore()
      .collection("users")
      .doc(myId)
      .update({
        phoneVerified: false,
        pinSet: false,
        userVerified: false
      })
      .then(async () => {
        this.setState({
          showModalMessage: false,
          loading: false,
          showError: false,
          errorMessage: ""
        });
        await AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiRemove(keys);
        });
        firebase.auth().signOut();
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendEmail = () => {
    Linking.openURL("mailto:support@socialdynamics.org?subject=PATHWAYS&body=");
  };

  render() {
    const {
      pinMatched,
      code,
      showError,
      errorMessage,
      myId,
      loading,
      pin,
      showModalMessage,
      appState
    } = this.state;
    console.log(myId);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
        enabled
        style={{ flex: 1 }}
      >
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 40
          }}
        />
        {pinMatched && appState === "active" && code === pin ? (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 20,
                marginBottom: 30,
                paddingHorizontal: 20,
                marginLeft: 10
              }}
            >
              Welcome to Pathway, please select the recovery pathway you wish to
              use.
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Preview")}
              style={{
                paddingVertical: 20,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                borderWidth: 2,
                borderColor: colors.grey,
                borderBottomWidth: 2,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                paddingHorizontal: 30,
                marginBottom: 20
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.darkGrey,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                Domestic Abuse Pathway
              </Text>
              <Image
                source={require("../../assets/arrow-right.png")}
                resizeMode="contain"
                style={{
                  display: "flex",
                  alignSelf: "center",
                  height: 25
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                this.logout();
              }}
            >
              <Text style={styles.resetText}>Not you? Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  marginTop: 20
                }
              ]}
              onPress={() => {
                this.sendEmail();
              }}
            >
              <Text style={[styles.resetText, { color: "blue" }]}>
                Report Issues
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center", padding: 40, flex: 1 }}>
            <Text style={[styles.textStyle, { marginBottom: 40 }]}>
              Welcome back, please enter your PIN to access your account.
            </Text>
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
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}
