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

export default class ProfileUpdate extends React.Component {
  render() {
    return (
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
            color: colors.darkGrey,
            fontSize: 20,
            marginHorizontal: 40,
            marginBottom: 20
          }}
        >
          Your constabulary administrator is the only person who can update your
          account details. If you wish to make a change please submit a request
          below.
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
                style={styles.container}
              />
              <TextInput
                onChangeText={props.handleChange("phone")}
                onBlur={props.handleBlur("phone")}
                value={props.values.phone}
                placeholder="VICTIM CONTACT"
                style={styles.container}
              />
              <TextInput
                onChangeText={props.handleChange("altphone")}
                onBlur={props.handleBlur("altphone")}
                value={props.values.altphone}
                placeholder="ALTERNATIVE CONTACT NUMBER"
                style={styles.container}
              />
              <TextInput
                onChangeText={props.handleChange("dob")}
                onBlur={props.handleBlur("dob")}
                value={props.values.dob}
                placeholder="DATE OF BIRTH"
                style={styles.container}
              />
              <TextInput
                onChangeText={props.handleChange("notes")}
                onBlur={props.handleBlur("notes")}
                value={props.values.notes}
                placeholder="MESSAGE/NOTES"
                style={styles.notes}
              />

              <TouchableOpacity
                onPress={props.handleSubmit}
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
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    width: "80%",
    alignSelf: "center",
    paddingLeft: 20
  },
  notes: {
    height: 40,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    width: "80%",
    alignSelf: "center",
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 120
  }
});
