import React, { Component, Fragment } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Dimensions,
  AsyncStorage,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import firebase from "react-native-firebase";
import ErrorMessage from "../components/Error";
// import firebase from "../utils/firebase";
import colors from "../style";
import { ModalLoading } from "../components/LoadScreen";

var { height, width } = Dimensions.get("window");

const getVerificationCodeApi = "http://167.99.90.138:8675/getVerificationCode";

// const text = [
//   "Welcome to Pathway, please enter your activation code to verify your device. Your activation code can be found in your welcome email.",
//   "If you do not have a welcome email please call 0800 1017 110. If you wish to apply to become a referrer please go to:",
//   "Thank you, an authorisation code has been sent to your mobile number, please enter it below to complete your device activation.",
//   "If you are having difficulties completing the authorisation please call 0800 1017 110."
// ];

const text = [
  "Welcome to Pathway, please enter your activation code to activate your account. Your activation code can be found in your welcome email.",
  "If you wish to apply to become a referrer please go to:",
  "Thank you! Please verify your mobile number.",
  "If you are having difficulties completing the authorisation please email support@socialdynamics.org."
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
  },
  touchableStyle: {
    marginVertical: 20,
    alignItems: "center"
  },
  resetText: {
    color: "blue",
    textAlign: "center"
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

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };

  registerMobile = code => {
    this.setState({ loading: true });
    const { user } = this.props.navigation.state.params;
    console.log("REGISTER MOBILE NUMBER", code);
    axios
      .post(getVerificationCodeApi, {
        mobileNumber: `+44${code}`
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

  logout = async () => {
    const { user, currentUser } = this.props.navigation.state.params;
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiRemove(keys);
    });
    this.setState({
      showModalMessage: false,
      loading: false,
      showError: false,
      errorMessage: "",
      userLoggedIn: false,
      pinMatched: false,
      pin: "",
      code: ""
    });
    firebase.auth().signOut();
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(user.userId)
    //   .update({
    //     phoneVerified: false,
    //     pinSet: false,
    //     userVerified: false
    //   })
    //   .then(async () => {
    //     this.setState({
    //       showModalMessage: false,
    //       loading: false,
    //       showError: false,
    //       errorMessage: "",
    //       userLoggedIn: false,
    //       pinMatched: false,
    //       pin: "",
    //       code: ""
    //     });
    //     await AsyncStorage.getAllKeys((err, keys) => {
    //       AsyncStorage.multiRemove(keys);
    //     });
    //     firebase.auth().signOut();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    const { user, currentUser } = this.props.navigation.state.params;
    const { phone } = user;
    console.log(user);
    const { showError, errorMessage, loading } = this.state;
    console.log(phone);
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ flex: 1, padding: 40, marginTop: 40 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ felx: 1 }}>
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

            <Text style={styles.textInputStyle}>{phone}</Text>
            {loading && <ModalLoading text="Please wait..." />}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => this.registerMobile(phone)}
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
              <TouchableOpacity onPress={() => this.registerMobile(phone)}>
                <Text
                  style={{
                    color: "blue",
                    fontSize: 16,
                    marginTop: 10
                  }}
                >
                  Resend code
                </Text>
                {/* <View
                  style={{
                    backgroundColor: colors.darkGrey,
                    height: 1,
                    width: 120
                  }}
                /> */}
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
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                this.setState({ loading: true });
                this.logout();
              }}
            >
              <Text style={styles.resetText}>Not you? Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
