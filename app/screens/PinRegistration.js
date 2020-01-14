import React, { Component } from "react";
import {
  Text,
  BackHandler,
  ScrollView,
  Platform,
  View,
  Image,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import ErrorMessage from "../components/Error";
import colors from "../style";
import { ModalLoading } from "../components/LoadScreen";
import OfflineNotice from "../components/OfflineNotice";

const styles = {
  textStyle: {
    color: colors.black,
    fontSize: 20
  }
};

const text = [
  "Please create a PIN. You will need to enter your PIN every time you access the app.",
  "Please re-enter your PIN."
];
class PinRegistration extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    secureTextEntry: true,
    fcmToken: "",
    showError: false,
    errorMessage: "",
    code: "",
    initialCode: "",
    reconfirmCode: false
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };

  checkCode = async code => {
    if (!this.props.isConnected.isConnected) {
      return Alert.alert("No Internet Connection");
    }
    const { user } = this.props.navigation.state.params;
    const { initialCode } = this.state;
    console.log(user);
    console.log(initialCode, code);
    if (initialCode !== code) {
      this.setState({
        showError: true,
        errorMessage: "Pin does not match",
        reconfirmCode: false,
        code: "",
        initialCode: ""
      });
    } else {
      await AsyncStorage.setItem("pin", code);
      this.setState({ loading: true });
      firebase
        .firestore()
        .collection("users")
        .doc(user.userId)
        .update({ pinSet: true, pin: code })
        .then(() => {
          this.setState({
            showError: false,
            errorMessage: "",
            reconfirmCode: false,
            code: "",
            initialCode: "",
            loading: false
          });
        })
        .catch(err => {
          this.setState({
            showError: true,
            errorMessage: "Something went wrong. Please try again.",
            reconfirmCode: false,
            code: "",
            initialCode: "",
            loading: false
          });
        });
    }
  };

  reconfirmCode = () => {};

  render() {
    const {
      showError,
      errorMessage,
      loading,
      code,
      reconfirmCode
    } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
        enabled
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 40
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {!this.props.isConnected.isConnected && (
            <View style={{ marginTop: 40 }}>
              <OfflineNotice />
            </View>
          )}
          <View style={{ flex: 1, paddingHorizontal: 40 }}>
            <Image
              source={require("../../assets/path-logo.png")}
              style={{
                alignSelf: "center",
                marginTop: 40,
                color: colors.accent,
                marginBottom: 20
              }}
            />
            <Text style={styles.textStyle}>
              {reconfirmCode ? text[1] : text[0]}
            </Text>
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 50
              }}
            >
              <SmoothPinCodeInput
                textStyle={{
                  fontSize: 24,
                  color: "salmon"
                }}
                textStyleFocused={{
                  color: "crimson"
                }}
                restrictToNumbers="true"
                value={code}
                autoFocus={true}
                onTextChange={code => this.setState({ code, showError: false })}
                onFulfill={codeInput => {
                  reconfirmCode
                    ? this.checkCode(codeInput)
                    : this.setState({
                        initialCode: codeInput,
                        reconfirmCode: true,
                        code: ""
                      });
                }}
              />
            </View>
            {showError && (
              <View style={{ alignSelf: "center" }}>
                <ErrorMessage errorMessage={errorMessage} marginTop={10} />
              </View>
            )}
            {loading && <ModalLoading text="Please wait" />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log("NETWORK STATUS", network);
  return {
    isConnected: network
  };
};

export default connect(mapStateToProps)(PinRegistration);
