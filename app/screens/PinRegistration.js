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
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import firebase from "react-native-firebase";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Icon } from "react-native-elements";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

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

export default class PinRegistration extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    secureTextEntry: true,
    fcmToken: "",
    showError: false,
    errorMessage: ""
  };

  pinInput = React.createRef();

  checkCode = () => {
    const { code } = this.state;
    firebase
      .firestore()
      .collection("pins")
      .doc(userId)
      .get()
      .then(codeResponse => {
        const { pin } = codeResponse.data();
        if (pin === code) {
          this.props.navigaton.navigate("Preview");
        } else {
          Alert.alert("Wrong ping");
        }
      });
  };

  componentDidMount = async () => {
    const fcmToken = await getFcmToken();
    this.setState({ fcmToken });
    stripe.setOptions({
      publishableKey: "pk_test_M4kMiU82SrweHoP8j7jHJ9TK00VtXX5nqq",
      merchantId: "merchant.com.tickle.sqweeks" // Optional
      // androidPayMode: 'test', // Android only
    });
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
            onSubmit={async values => {
              console.log(values);
              firebase
                .auth()
                .signInWithPhoneNumber(values.phone)
                .then(confirmResult => {
                  console.log(confirmResult);
                });
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
                  In order to secure the data in the app we need you to create a
                  PIN you will need to enter every time you access the app.
                </Text>
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 20
                  }}
                >
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
                    onTextChange={code => this.setState({ code })}
                    onFulfill={() => this._checkCode()}
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

                <Image
                  source={require("../../assets/pathway.png")}
                  style={{
                    alignSelf: "center",
                    marginTop: 240,

                    color: colors.accent
                  }}
                />
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
