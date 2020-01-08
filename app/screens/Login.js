import React, { Component, Fragment } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  View,
  Image,
  BackHandler,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import firebase from "react-native-firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import ErrorMessage from "../components/Error";
import { ModalLoading } from "../components/LoadScreen";
import colors from "../style";
// import firebase from "../utils/firebase";
import OfflineNotice from "../components/OfflineNotice";

const getAccountApi = "http://167.99.90.138:8675/getAccount";
const getCustomTokenApi = "http://167.99.90.138:8675/getCustomToken";

const text = [
  " Welcome to Pathway, please enter your activation code to activate your account. Your activation code can be found in your welcome email.",
  "If you do not have a welcome email or have any issues, please email us at:",
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

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fcmToken: "",
    showError: false,
    errorMessage: "",
    loading: false,
    text: ""
  };

  componentDidMount = async () => {
    NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  };

  componentWillUnmount() {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // handleConnectivityChange = () => {
  //   NetInfo.addEventListener(state => {
  //     console.log("Connection type", state.type);
  //     console.log("Is connected?", state.isConnected);
  //   });
  // };

  onBackPress = () => {
    return true;
  };

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
        console.log("CHECK", contactData);
        await AsyncStorage.setItem("userDetails", JSON.stringify(contactData));
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
                  phoneVerified: code === "0034J00000E4in8QAB" ? true : false,
                  pin: 0,
                  pinSet: false,
                  phone: contactData.Phone
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
      <KeyboardAwareScrollView>
        {!this.props.isConnected.isConnected && (
          <View style={{ marginTop: 40 }}>
            <OfflineNotice />
          </View>
        )}
        <View style={{ flex: 1, paddingHorizontal: 40 }}>
          <Formik
            initialValues={{ code: "" }}
            onSubmit={values => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
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
                    marginTop: 40,
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
                <TextInput
                  style={styles.textInputStyle}
                  value={values.code}
                  onChangeText={handleChange("code")}
                  placeholder="ACTIVATION CODE"
                  onBlur={() => setFieldTouched("code")}
                />
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
                <TouchableOpacity
                  onPress={() => {
                    if (!this.props.isConnected.isConnected) {
                      return Alert.alert("No Internet Connection");
                    }
                    this.sendEmail();
                  }}
                >
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
                  style={{ marginBottom: 10 }}
                  onPress={() => {
                    if (!this.props.isConnected.isConnected) {
                      return Alert.alert("No Internet Connection");
                    }
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
              </Fragment>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
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

export default connect(mapStateToProps)(Login);
