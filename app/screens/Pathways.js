import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Image
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import colors from "../style";
import ErrorMessage from "../components/Error";

const styles = {
  textStyle: {
    color: colors.darkGrey,
    fontSize: 20
  }
};
export default class Pathways extends Component {
  state = {
    pin: "",
    pinMatched: false,
    code: "",
    showError: false,
    errorMessage: ""
  };
  componentDidMount = async () => {
    const pin = await AsyncStorage.getItem("pin");
    console.log(pin);
    // const { user } = this.props.navigation.state.params;
    // console.log(user);
    this.setState({ pin });
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
        errorMessage: "",
        pin: "",
        code: ""
      });
    }
  };
  render() {
    const { pin, pinMatched, code, showError, errorMessage } = this.state;
    return (
      <View>
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 40
          }}
        />
        {pinMatched ? (
          <View>
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 20,
                marginBottom: 30,
                paddingHorizontal: 20
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
                paddingHorizontal: 30
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
          </View>
        ) : (
          <View style={{ alignItems: "center", padding: 40 }}>
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
              value={code}
              onTextChange={code => this.setState({ code, showError: false })}
              onFulfill={codeInput => {
                this.checkCode(codeInput);
              }}
            />
            {showError && (
              <ErrorMessage errorMessage={errorMessage} marginTop={10} />
            )}
          </View>
        )}
      </View>
    );
  }
}
