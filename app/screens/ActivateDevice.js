import React, { Component } from "react";
import {
  Text,
  Image,
  Platform,
  View,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import firebase from "react-native-firebase";
import axios from "axios";
import ErrorMessage from "../components/Error";
import { connect } from "react-redux";
import { ModalLoading } from "../components/LoadScreen";
import colors from "../style";
import OfflineNotice from "../components/OfflineNotice";

const checkVerificationCodeApi =
  "http://167.99.90.138:8675/checkVerificationCode";

class ActivateDevice extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    code: "",
    error: false,
    errorMessage: "",
    loading: false
  };

  checkCode = code => {
    if (!this.props.isConnected.isConnected) {
      return Alert.alert("No Internet Connection");
    }
    this.setState({ loading: true });
    const { mobileNumber, user } = this.props.navigation.state.params;
    const { userId } = user;
    // const { code } = this.state;
    console.log(code);
    axios
      .post(checkVerificationCodeApi, {
        mobileNumber: `+44${mobileNumber}`,
        code
      })
      .then(respose => {
        console.log(respose);
        const { valid } = respose.data;
        if (!valid) {
          this.setState({
            error: true,
            errorMessage: "Please enter the correct code.",
            loading: false,
            code: ""
          });
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .update({ phoneVerified: true })
            .then(() => {
              this.setState({
                error: false,
                errorMessage: "",
                loading: false
              });
            })
            .catch(error => {
              this.setState({
                error: true,
                errorMessage: "Something went wrong. Please try again",
                loading: false,
                code: ""
              });
            });
          // Alert.alert("Code Approved");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: true,
          errorMessage: "Something went wrong. Please try again",
          loading: false
        });
      });
  };

  render() {
    const { code, error, loading, errorMessage } = this.state;
    console.log(code);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
        enabled
        style={{ flex: 1, paddingVertical: 40 }}
      >
        {!this.props.isConnected.isConnected && (
          <View style={{ marginTop: 40 }}>
            <OfflineNotice />
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/path-logo.png")}
            style={{
              alignSelf: "center",
              marginTop: 40,
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
            autoFocus={true}
            value={code}
            onTextChange={code => this.setState({ code })}
            onFulfill={codeInput => this.checkCode(codeInput)}
            onBackspace={this._focusePrevInput}
          />
          {loading && <ModalLoading text="Please wait" />}
          {error && <ErrorMessage errorMessage={errorMessage} marginTop={10} />}
        </View>
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

export default connect(mapStateToProps)(ActivateDevice);
