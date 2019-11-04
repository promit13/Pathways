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

const text = [
  "Welcome to Pathway, please enter your mobile phone number and activation code to verify your device. Your activation code can be found in your welcome email.",
  "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:",
  "Thank you, an authorisation code has been sent to your mobile number, please enter it below to complete your device activation.",
  "If you are having difficulties completing the authorisation please call 0800 1017 110."
];

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

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    secureTextEntry: true,
    fcmToken: "",
    showError: false,
    errorMessage: "",
    gotPhoneNumber: false
  };

  componentDidMount = async () => {
    const fcmToken = await getFcmToken();
    this.setState({ fcmToken });
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

  onButtonPress = () => {
    const { gotPhoneNumber } = this.state;
    if (gotPhoneNumber) {
      // return this.registerUser();
      return console.log(gotPhoneNumber);
    }
    this.setState({ gotPhoneNumber: true });
  };

  render() {
    const {
      secureTextEntry,
      fcmToken,
      showError,
      errorMessage,
      gotPhoneNumber
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <Formik
            initialValues={{ phoneNumber: "" }}
            onSubmit={values => {
              console.log(values);
              this.onButtonPress();
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
                  {gotPhoneNumber ? text[2] : text[0]}
                </Text>
                <View>
                  <TextInput
                    style={styles.textInputStyle}
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    placeholder={
                      gotPhoneNumber ? "AUTHORISATION CODE" : "PHONE NUMBER"
                    }
                    onBlur={() => setFieldTouched("phone")}
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
                {touched.phone && errors.phone && (
                  <Text style={styles.textErrorStyle}>{errors.phone}</Text>
                )}
                {showError ? (
                  <ErrorMessage errorMessage={errorMessage} />
                ) : null}
                <TouchableOpacity
                  style={{ width: "80%", alignSelf: "center", marginTop: 20 }}
                  onPress={handleSubmit}
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
                    {gotPhoneNumber ? "ACTIVATE" : "AUTHORISE"}
                  </Text>
                </TouchableOpacity>
                {gotPhoneNumber ? (
                  <View>
                    <Text
                      style={{
                        color: colors.darkGrey,
                        fontSize: 20,
                        marginHorizontal: 40,
                        marginTop: 20
                      }}
                    >
                      If you have not received a code please click button below.
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: colors.darkGrey,
                          fontSize: 20,
                          marginHorizontal: 40,
                          marginTop: 10
                        }}
                      >
                        Click here
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.darkGrey,
                          marginHorizontal: 40,
                          height: 1,
                          width: 90
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginHorizontal: 40,
                    marginTop: 20
                  }}
                >
                  {gotPhoneNumber ? text[3] : text[1]}
                </Text>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginHorizontal: 40,
                    marginBottom: 20
                  }}
                >
                  https://socialdynamics.org/apply
                </Text>
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
