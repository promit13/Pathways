import React, { Component } from "react";
import {
  Text,
  Alert,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import firebase from "react-native-firebase";
import ErrorMessage from "../components/Error";
import colors from "../style";
import { ModalLoading } from "../components/LoadScreen";

var { height, width } = Dimensions.get("window");

const styles = {
  textStyle: {
    color: colors.darkGrey,
    fontSize: 20
  }
};

const text = [
  "In order to secure the data in the app, we need you to create a PIN. You will need to enter every time you access the app.",
  "Please re-enter your PIN to confirm you have entered it correctly."
];
export default class PinRegistration extends Component {
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

  pinInput = React.createRef();

  checkCode = code => {
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
      this.setState({ loading: true });
      firebase
        .firestore()
        .collection("users")
        .doc(user.userId)
        .update({ pinSet: true, pin: code })
        .then(async () => {
          await AsyncStorage.setItem("pin", code);
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
        behavior="padding"
        enabled
        style={{ padding: 40, flex: 1, alignItems: "center", marginTop: 40 }}
      >
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
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
            marginTop: 20
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
          <ErrorMessage errorMessage={errorMessage} marginTop={10} />
        )}
        {loading && <ModalLoading text="Please wait" />}
      </KeyboardAvoidingView>
    );
  }
}
