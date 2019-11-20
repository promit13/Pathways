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
import axios from "axios";
import * as yup from "yup";
import { Button, Icon } from "react-native-elements";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import firebase from "react-native-firebase";
import { getFcmToken } from "../utils/FcmToken";
import ErrorMessage from "../components/Error";
import { ModalLoading } from "../components/LoadScreen";
import colors from "../style";

var { height, width } = Dimensions.get("window");

const getAccountApi = "http://localhost:8675/account";
const getCustomTokenApi = "http://localhost:8675/getCustomToken";

// const text = [
//   "Welcome to Pathway, please enter your activation code to verify your device. Your activation code can be found in your welcome email.",
//   "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:",
//   "Thank you, an authorisation code has been sent to your mobile number, please enter it below to complete your device activation.",
//   "If you are having difficulties completing the authorisation please call 0800 1017 110."
// ];

const text = [
  "Welcome to Pathway, please enter your activation code to activate your account. Your activation code can be found in your welcome email.",
  "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:"
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
    fontSize: 18,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    alignContent: "center"
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
    fcmToken: "",
    showError: false,
    errorMessage: "",
    mobileNumber: "",
    loading: false
  };

  componentDidMount = async () => {
    const fcmToken = await getFcmToken();
    this.setState({ fcmToken });
  };

  registerUser = values => {
    const { code } = values;
    axios
      .post(getAccountApi, { id: "0014J00000A4eBgQAJ" })
      .then(accountResponse => {
        console.log(accountResponse);
        const { Phone } = accountResponse.data[0];
        console.log(Phone);
        axios
          .post(getCustomTokenApi, { uid: "0014J00000A4eBgQAJ" })
          .then(response => {
            console.log(response);
            console.log(response.data);
            firebase
              .auth()
              .signInWithCustomToken(response.data)
              .then(res => {
                console.log(res);
                console.log(res.user._user.uid);
                const userDetails = {
                  userVerified: true,
                  userId: "0014J00000A4eBgQAJ",
                  phoneVerified: false,
                  pin: 0,
                  pinSet: false,
                  phone: Phone,
                  messagingToken: this.state.fcmToken
                };
                firebase
                  .firestore()
                  .collection("users")
                  .doc(res.user._user.uid)
                  .set(userDetails);
              })
              .then(r => {
                this.setState({ loading: false });
                console.log(r);
              })
              .catch(e => {
                this.setState({
                  loading: false,
                  showError: true,
                  errorMessage: "Something went wrong. Please try again."
                });
                console.log(e);
              })
              .catch(error => {
                this.setState({
                  loading: false,
                  showError: true,
                  errorMessage: "Something went wrong. Please try again."
                });
                console.log(error);
                // ...
              });
          })
          .catch(err => {
            this.setState({
              loading: false,
              showError: true,
              errorMessage: "Something went wrong. Please try again."
            });
            console.log(err);
          });
      })
      .catch(er => {
        this.setState({
          loading: false,
          showError: true,
          errorMessage: "Something went wrong. Please try again."
        });
        console.log(er);
      });
  };

  render() {
    const { showError, errorMessage, mobileNumber, loading } = this.state;
    console.log(mobileNumber);
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ flex: 1, padding: 40, marginTop: 40 }}
      >
        <ScrollView>
          <Formik
            initialValues={{ code: mobileNumber }}
            onSubmit={values => {
              this.setState({ loading: true });
              this.registerUser(values);
            }}
            validationSchema={yup.object().shape({
              code: yup.string().required("Please enter the activation code")
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
                    marginBottom: 20
                  }}
                >
                  {text[0]}
                </Text>
                <View>
                  <TextInput
                    style={styles.textInputStyle}
                    value={values.code}
                    onChangeText={handleChange("code")}
                    placeholder="ACTIVATION CODE"
                    onBlur={() => setFieldTouched("code")}
                  />
                </View>
                {touched.code && errors.code && (
                  <Text style={styles.textErrorStyle}>{errors.code}</Text>
                )}
                {showError && <ErrorMessage errorMessage={errorMessage} />}
                {loading && <ModalLoading text="Please wait ..." />}
                <TouchableOpacity
                  style={{ marginTop: 20 }}
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
                    AUTHORISE
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginTop: 20
                  }}
                >
                  {text[1]}
                </Text>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
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
