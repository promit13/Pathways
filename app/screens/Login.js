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
import axios from "axios";

var { height, width } = Dimensions.get("window");

const getAccountApi = "http://localhost:8675/account";
const getVerificationCodeApi = "http://localhost:8675/getVerificationCode";

// const text = [
//   "Welcome to Pathway, please enter your activation code to verify your device. Your activation code can be found in your welcome email.",
//   "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:",
//   "Thank you, an authorisation code has been sent to your mobile number, please enter it below to complete your device activation.",
//   "If you are having difficulties completing the authorisation please call 0800 1017 110."
// ];

const text = [
  "Welcome to Pathway, please enter your activation code to activate your account. Your activation code can be found in your welcome email.",
  "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:",
  "Thank you. Please verify your mobile number.",
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
    accountVerified: false,
    mobileNumber: ""
  };

  componentDidMount = async () => {
    const fcmToken = await getFcmToken();
    this.setState({ fcmToken });
  };

  registerUser = values => {
    const { code } = values;
    axios
      .post(getAccountApi, { id: "0014J00000A4eBgQAJ" })
      .then(response => {
        console.log(response);
        const { Phone } = response.data[0];
        console.log(Phone);
        this.setState({ accountVerified: true, mobileNumber: "123456" });
      })
      .catch(err => console.log(err));
  };

  registerMobile = values => {
    console.log("REGISTER MOBILE NUMBER");
    const { code } = values;
    axios
      .post(getVerificationCodeApi, {
        mobileNumber: code
      })
      .then(respose => {
        console.log(respose);
        this.props.navigation.navigate("ActivateDevice", {
          mobileNumber: code
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      secureTextEntry,
      fcmToken,
      showError,
      errorMessage,
      accountVerified,
      mobileNumber
    } = this.state;
    console.log(mobileNumber);
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <ScrollView>
          <Formik
            initialValues={{ code: mobileNumber }}
            onSubmit={values => {
              accountVerified
                ? this.registerMobile(values)
                : this.registerUser(values);
            }}
            validationSchema={yup.object().shape({
              code: yup.string().required("Please fill the above field")
            })}
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
                  {accountVerified ? text[2] : text[0]}
                </Text>
                <View>
                  <TextInput
                    style={styles.textInputStyle}
                    value={values.code}
                    onChangeText={handleChange("code")}
                    placeholder={
                      accountVerified ? "MOBILE NUMBER" : "ACTIVATION CODE"
                    }
                    onBlur={() => setFieldTouched("code")}
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
                {touched.code && errors.code && (
                  <Text style={styles.textErrorStyle}>{errors.code}</Text>
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
                    {accountVerified ? "ACTIVATE" : "AUTHORISE"}
                  </Text>
                </TouchableOpacity>
                {accountVerified ? (
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
                  {accountVerified ? text[3] : text[1]}
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
