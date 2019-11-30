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
  Linking,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import firebase from "react-native-firebase";
import ErrorMessage from "../components/Error";
import { ModalLoading } from "../components/LoadScreen";
import colors from "../style";

var { height, width } = Dimensions.get("window");

const getAccountApi = "http://167.99.90.138:8675/getAccount";
const getCustomTokenApi = "http://167.99.90.138:8675/getCustomToken";

// const text = [
//   " to Pathway, please enter your activation code to verify your device. Your activation code can be found in your welcome email.",
//   "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:",
//   "Thank you, an authorisation code has been sent to your mobile number, please enter it below to complete your device activation.",
//   "If you are having difficulties completing the authorisation please call 0800 1017 110."
// ];

const text = [
  " Welcome to Pathway, please enter your activation code to activate your account. Your activation code can be found in your welcome email.",
  "If you do not have a welcome email, please email us at:",
  "If you wish to apply to become a referrer please go to:"
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
    fontSize: 12,
    color: "red",
    marginTop: 5
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
    loading: false
  };

  // componentDidMount = async () => {
  //   const fcmToken = await getFcmToken();
  //   this.setState({ fcmToken });
  // };

  registerUser = values => {
    const { code } = values;
    axios
      // .post(getAccountApi, { id: "0034J00000AnUldQAF" })
      .post(getAccountApi, { id: code })
      .then(async accountResponse => {
        console.log(accountResponse.data);
        const contactData = accountResponse.data;
        if (contactData.errorCode) {
          if (contactData.errorCode === "NOT_FOUND") {
            return this.setState({
              loading: false,
              showError: true,
              errorMessage: "Invaild code. Please try again."
            });
          } else {
            return this.setState({
              loading: false,
              showError: true,
              errorMessage: `Error: ${contactData.errorCode} `
            });
          }
        }

        await AsyncStorage.setItem("userDetails", JSON.stringify(contactData));

        const { Phone } = contactData;
        console.log(Phone);
        axios
          .post(getCustomTokenApi, { uid: code })
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
                  userId: code,
                  phoneVerified: false,
                  pin: 0,
                  pinSet: false,
                  phone: Phone
                  // messagingToken: this.state.fcmToken
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

  sendEmail = () => {
    Linking.openURL(
      "mailto:support@socialdynamics.org?subject=PATHWAYS&body=Description"
    );
  };

  render() {
    const { showError, errorMessage, loading } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        behavior={Platform.OS === "android" ? "" : "padding"}
        style={{ flex: 1, padding: 40, marginTop: 40 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{ code: "" }}
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
                <TouchableOpacity onPress={() => this.sendEmail()}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      color: "blue"
                    }}
                  >
                    support@socialdynamics.org
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginTop: 20
                  }}
                >
                  {text[2]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL("https://socialdynamics.org").catch(err =>
                      console.log("An error occurred", err)
                    );
                  }}
                >
                  <Text
                    style={{
                      color: "blue",
                      fontSize: 16,
                      marginTop: 10
                    }}
                  >
                    https://socialdynamics.org/apply
                  </Text>
                </TouchableOpacity>
                {/* <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginBottom: 20
                  }}
                >
                  https://socialdynamics.org/apply
                </Text> */}
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
