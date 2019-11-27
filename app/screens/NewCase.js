import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { TextInputMask } from "react-native-masked-text";
import firebase from "react-native-firebase";
import colors from "../style";
import ErrorMessage from "../components/Error";
export default class NewCase extends React.Component {
  state = {
    checkBoxChecked: false,
    showError: true,
    errorMessage: ""
  };

  componentDidMount() {
    console.log(new Date());
  }

  onContinue = values => {
    console.log(values);
    if (!this.state.checkBoxChecked) {
      this.setState({
        showError: true,
        errorMessage: "Please check the consent from victim"
      });
      return;
    }
    this.props.navigation.navigate("Questions", { userDetails: values });
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };

  render() {
    const { checkBoxChecked, showError, errorMessage } = this.state;
    console.log(checkBoxChecked);
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              color: colors.accent,
              fontSize: 20,
              fontWeight: "300",
              marginHorizontal: 40,
              marginBottom: 20
            }}
          >
            Please complete all required fields in order to make a successful
            referral.
          </Text>
          <Formik
            initialValues={{
              name: "",
              dob: "",
              phone: "",
              safeContactNumber: "",
              safeEmail: "",
              message: ""
            }}
            onSubmit={values => {
              console.log(values);
              this.onContinue(values);
              // this.props.navigation.navigate("Questions");
            }}
            validationSchema={yup.object().shape({
              name: yup
                .string()
                .required("Please enter the name of the victim"),
              dob: yup.string().required("Please enter a date of birth"),
              phone: yup.number().required("Please enter a contact number"),
              safeContactNumber: yup
                .number()
                .required("Please enter a safe contact number"),
              safeEmail: yup
                .string()
                .email()
                .required("Please enter a safe email address"),
              message: yup.string().required("Please enter messages/notes")
              // checkbox: yup.boolean().required("Must accept conditions")
            })}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit
            }) => (
              <View>
                <TextInput
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholder="NAME OF VICTIM"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth: touched.name && errors.name ? 2 : 0
                    }
                  ]}
                />
                {touched.name && errors.name && (
                  <Text style={styles.textErrorStyle}>{errors.name}</Text>
                )}
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "YYYY-MM-DD"
                  }}
                  placeholderTextColor={colors.darkGrey}
                  placeholder="DATE OF BIRTH ( YYYY-MM-DD )"
                  onChangeText={handleChange("dob")}
                  onBlur={handleBlur("dob")}
                  value={values.dob}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth: touched.dob && errors.dob ? 2 : 0
                    }
                  ]}
                />
                {touched.dob && errors.dob && (
                  <Text style={styles.textErrorStyle}>{errors.dob}</Text>
                )}
                <TextInput
                  onChangeText={handleChange("phone")}
                  keyboardType="phone-pad"
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  placeholder="VICTIM CONTACT NUMBER"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth: touched.phone && errors.phone ? 2 : 0
                    }
                  ]}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.textErrorStyle}>{errors.phone}</Text>
                )}
                <TextInput
                  onChangeText={handleChange("safeContactNumber")}
                  onBlur={handleBlur("safeContactNumber")}
                  keyboardType="phone-pad"
                  value={values.safeContactNumber}
                  placeholder="SAFE CONTACT NUMBER"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth:
                        touched.safeContactNumber && errors.safeContactNumber
                          ? 2
                          : 0
                    }
                  ]}
                />
                {touched.safeContactNumber && errors.safeContactNumber && (
                  <Text style={styles.textErrorStyle}>
                    {errors.safeContactNumber}
                  </Text>
                )}
                <TextInput
                  onChangeText={handleChange("safeEmail")}
                  onBlur={handleBlur("safeEmail")}
                  value={values.safeEmail}
                  placeholder="SAFE EMAIL ADDRESS"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth:
                        touched.safeEmail && errors.safeEmail ? 2 : 0
                    }
                  ]}
                />
                {touched.safeEmail && errors.safeEmail && (
                  <Text style={styles.textErrorStyle}>{errors.safeEmail}</Text>
                )}
                <TextInput
                  onChangeText={handleChange("message")}
                  onBlur={handleBlur("message")}
                  value={values.message}
                  placeholder="MESSAGE/NOTES"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    { borderBottomWidth: 2, height: 60 }
                  ]}
                  multiline="true"
                />
                {touched.message && errors.message && (
                  <Text style={styles.textErrorStyle}>{errors.message}</Text>
                )}
                <CheckBox
                  title="THE VICTIM HAS GIVEN CONSENT TO BE REFERRED"
                  checked={this.state.checkBoxChecked}
                  containerStyle={{
                    marginTop: 20,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    marginLeft: 32,
                    paddingRight: 20
                  }}
                  checkedColor={colors.accent}
                  onPress={() =>
                    this.setState({
                      checkBoxChecked: !checkBoxChecked,
                      showError: false,
                      errorMessage: ""
                    })
                  }
                />
                {showError && (
                  <ErrorMessage errorMessage={errorMessage} marginLeft={40} />
                )}
                <Button
                  // onPress={handleSubmit}
                  onPress={() => this.onContinue()}
                  // onPress={() => firebase.auth().signOut()}
                  title="Contiue"
                  buttonStyle={{
                    marginHorizontal: 40,
                    marginTop: 20,
                    color: "white",
                    height: 45,
                    backgroundColor: colors.accent
                  }}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.darkGrey,
    width: "80%",
    alignSelf: "center",
    paddingLeft: 20
  },
  notes: {
    height: 120,
    borderWidth: 2,
    borderColor: colors.darkGrey,
    width: "80%",
    alignSelf: "center",
    paddingTop: 10,
    textAlign: "left",
    paddingLeft: 20
  },
  textErrorStyle: {
    fontSize: 10,
    color: "red",
    marginLeft: 45
  }
});
