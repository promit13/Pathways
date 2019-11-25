import React, { Component, Fragment } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import ErrorMessage from "../components/Error";
import colors from "../style";
import { ModalLoading } from "../components/LoadScreen";

var { height, width } = Dimensions.get("window");

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

export default class VerifyMobile extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    secureTextEntry: true,
    fcmToken: "",
    showError: false,
    errorMessage: "",
    loading: false,
    accountVerified: false,
    mobileNumber: ""
  };

  componentDidMount = () => {};

  registerMobile = values => {
    this.setState({ loading: true });
    const { user } = this.props.navigation.state.params;
    console.log("REGISTER MOBILE NUMBER");
    console.log(values);
    const { code } = values;
    axios
      .post(getVerificationCodeApi, {
        mobileNumber: code
      })
      .then(response => {
        console.log(response);
        if (response.data.code === 60200) {
          return this.setState({
            showError: true,
            loading: false,
            errorMessage: "Please enter valid phone number."
          });
        }
        this.setState({ loading: false, showError: false, errorMessage: "" });
        this.props.navigation.navigate("ActivateDevice", {
          mobileNumber: code,
          user
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
  };

  render() {
    const { user, currentUser } = this.props.navigation.state.params;
    const mobileNumber = user.phone !== null ? user.phone : "";
    console.log(user);
    const { showError, errorMessage, loading } = this.state;
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
              this.registerMobile(values);
            }}
            validationSchema={yup.object().shape({
              code: yup.string().required("Please enter your mobile number")
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
                  {text[2]}
                </Text>
                <View>
                  <TextInput
                    style={styles.textInputStyle}
                    value={values.code}
                    onChangeText={handleChange("code")}
                    placeholder="MOBILE NUMBER (+447*********)"
                    onBlur={() => setFieldTouched("code")}
                  />
                </View>
                {touched.code && errors.code && (
                  <Text style={styles.textErrorStyle}>{errors.code}</Text>
                )}
                {showError && (
                  <ErrorMessage errorMessage={errorMessage} marginTop={5} />
                )}
                {loading && <ModalLoading text="Please wait..." />}
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
                    ACTIVATE
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: colors.darkGrey,
                      fontSize: 20,
                      marginTop: 20
                    }}
                  >
                    If you have not received a code please click button below.
                  </Text>
                  <TouchableOpacity onPress={() => this.registerMobile(values)}>
                    <Text
                      style={{
                        color: colors.darkGrey,
                        fontSize: 20,
                        marginTop: 10
                      }}
                    >
                      Click here
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.darkGrey,
                        height: 1,
                        width: 90
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    marginTop: 20
                  }}
                >
                  {text[3]}
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