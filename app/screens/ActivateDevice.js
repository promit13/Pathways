import React, { Component, Fragment } from "react";
import {
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  View,
  Image,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";

import { Formik } from "formik";
import * as yup from "yup";
import { Button, Icon } from "react-native-elements";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import firebase from "react-native-firebase";
import { getFcmToken } from "../utils/FcmToken";
import ErrorMessage from "../components/Error";
import colors from "../style";

var { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  loginText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20
  },
  fieldContainer: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 50,
    borderColor: "white",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  textInputStyle: {
    flex: 1,
    height: 40,
    color: "black",
    marginLeft: 10,
    fontSize: 18
  },
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

  registerUser = async () => {
    const { mobileNumber } = this.props.navigation.state.params;
    const { code } = this.state;
    const { confirm } = await auth().signInWithPhoneNumber(mobileNumber);
    try {
      await confirm(code); // User entered code
      // Successful login - onAuthStateChanged is triggered
    } catch (e) {
      console.error(e); // Invalid code
    }
  };

  render() {
    const {
      secureTextEntry,
      fcmToken,
      code,
      password,
      showError,
      errorMessage
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <Formik
            initialValues={{ phoneNumber: "" }}
            onSubmit={values => {
              this.registerUser();
            }}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit
            }) => (
              <Fragment>
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
                  Welcome to Pathway, please enter your mobile phone number and
                  activation code to verify your device. Your activation code
                  can be found in your welcome email.
                </Text>
                <View>
                  <TextInput
                    style={styles.textInputStyle}
                    value={values.phone}
                    onChangeText={handleChange("authorisation")}
                    placeholder="AUTHORISATION CODE"
                    onBlur={() => setFieldTouched("authorisation")}
                    style={{
                      borderWidth: 2,
                      borderColor: colors.lightGrey,
                      width: "80%",
                      alignContent: "center",
                      alignSelf: "center",
                      paddingLeft: 20,

                      height: 45
                    }}
                  />
                </View>
                {touched.authorisation && errors.authorisation && (
                  <Text style={styles.textErrorStyle}>
                    {errors.authorisation}
                  </Text>
                )}
                {showError ? (
                  <ErrorMessage errorMessage={errorMessage} />
                ) : null}
                <TouchableOpacity
                  style={{ width: "80%", alignSelf: "center", marginTop: 20 }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  underlayColor="#fff"
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      backgroundColor: colors.accent,
                      paddingTop: 12,
                      fontSize: 17,
                      height: 45
                    }}
                  >
                    AUTHORISE
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginHorizontal: 40,
                    marginTop: 20
                  }}
                >
                  If you have not received a code please click here.
                </Text>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginHorizontal: 40,
                    marginBottom: 20
                  }}
                >
                  If you are having difficulties completing the authorisation
                  please call 0800 1017 110.
                </Text>
                <Image
                  source={require("../../assets/pathway.png")}
                  style={{
                    alignSelf: "center",
                    marginTop: 40,
                    color: colors.accent
                  }}
                />
                <SmoothPinCodeInput
                  ref={this.pinInput}
                  value={code}
                  onTextChange={code => this.setState({ code })}
                  onFulfill={this._checkCode}
                  onBackspace={this._focusePrevInput}
                />
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
