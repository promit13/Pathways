import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import axios from "axios";
import ErrorMessage from "../components/Error";
import colors from "../style";

const checkVerificationCodeApi = "http://localhost:8675/checkVerificationCode";

const styles = StyleSheet.create({
  textErrorStyle: {
    fontSize: 10,
    color: "red",
    marginLeft: 40
  }
});

export default class ActivateDevice extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    code: "",
    error: false
  };

  checkCode = code => {
    const { mobileNumber } = this.props.navigation.state.params;
    // const { code } = this.state;
    console.log(code);
    axios
      .post(checkVerificationCodeApi, {
        mobileNumber,
        code
      })
      .then(respose => {
        console.log(respose);
        const { status } = respose.data;
        if (status === "pending") {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  render() {
    const { code, error } = this.state;
    console.log(code);
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ flex: 1, alignItems: "center" }}
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
        <Text
          style={{
            color: colors.darkGrey,
            fontSize: 20,
            marginHorizontal: 40,
            marginBottom: 20
          }}
        >
          Please enter the code you just received via SMS.
        </Text>
        <SmoothPinCodeInput
          ref={this.pinInput}
          codeLength={6}
          value={code}
          onTextChange={code => this.setState({ code })}
          onFulfill={code => this.checkCode(code)}
          onBackspace={this._focusePrevInput}
        />
        {error && <ErrorMessage errorMessage="Wrong code" marginTop={10} />}
      </KeyboardAvoidingView>
    );
  }
}
