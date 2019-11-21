import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
import { Avatar, Button, Input, Icon, CheckBox } from "react-native-elements";
import firebase from "react-native-firebase";
import colors from "../style";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Formik } from "formik";

export default class NewCase extends React.Component {
  state = {
    checkBoxChecked: false
  };

  render() {
    const { checkBoxChecked } = this.state;
    return (
      <ScrollView>
        <View>
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
            initialValues={{ email: "" }}
            onSubmit={values => console.log(values)}
          >
            {props => (
              <View>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                  placeholder="NAME OF VICTIM"
                  placeholderTextColor={colors.darkGrey}
                  style={styles.container}
                />
                <TextInput
                  onChangeText={props.handleChange("phone")}
                  onBlur={props.handleBlur("phone")}
                  value={props.values.phone}
                  placeholder="VICTIM CONTACT NUMBER"
                  placeholderTextColor={colors.darkGrey}
                  style={styles.container}
                />
                <TextInput
                  onChangeText={props.handleChange("altphone")}
                  onBlur={props.handleBlur("altphone")}
                  value={props.values.altphone}
                  placeholder="SAFE CONTACT NUMBER"
                  placeholderTextColor={colors.darkGrey}
                  style={styles.container}
                />
                <TextInput
                  onChangeText={props.handleChange("dob")}
                  onBlur={props.handleBlur("dob")}
                  value={props.values.dob}
                  placeholder="DATE OF BIRTH"
                  placeholderTextColor={colors.darkGrey}
                  style={styles.container}
                />
                {/* <TextInput
                  onChangeText={props.handleChange("safeEmail")}
                  onBlur={props.handleBlur("safeEmail")}
                  value={props.values.safeEmail}
                  placeholder="SAFE EMAIL ADDRESS"
                  style={styles.container}
                /> */}
                <TextInput
                  onChangeText={props.handleChange("message")}
                  onBlur={props.handleBlur("message")}
                  value={props.values.message}
                  placeholder="MESSAGE/NOTES"
                  placeholderTextColor={colors.darkGrey}
                  style={styles.notes}
                  multiline="true"
                />
                <CheckBox
                  title="THE VICTIM HAS GIVEN CONSENT TO BE REFERRED"
                  checked={checkBoxChecked}
                  containerStyle={{
                    marginTop: 20,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    marginLeft: 32
                  }}
                  checkedColor={colors.accent}
                  onPress={() =>
                    this.setState({ checkBoxChecked: !checkBoxChecked })
                  }
                />
                <TouchableOpacity
                  onPress={
                    () => this.props.navigation.navigate("Questions")
                    // () => this.props.navigation.navigate("RepeatReferrals")
                    // () => firebase.auth().signOut()
                  }
                  style={{
                    marginHorizontal: 40,
                    marginTop: 20,
                    color: "white",
                    height: 45,
                    backgroundColor: colors.accent
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 12,
                      color: "white",
                      fontSize: 17
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
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
  }
});
