import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { Avatar, Button, Input, Icon } from "react-native-elements";
import firebase from "react-native-firebase";
import colors from "../style";
import DateTimePicker from "react-native-modal-datetime-picker";

import { Formik } from "formik";

export default class ThankYou extends React.Component {
  render() {
    return (
      <ScrollView>
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 20
          }}
        />
        <View style={{ marginHorizontal: 40 }}>
          <Text
            style={{
              color: colors.darkGrey,
              fontSize: 30,

              marginBottom: 10
            }}
          >
            Thank You!
          </Text>
          <Text style={{ fontSize: 20, color: colors.darkGrey }}>
            Your referral has been successfully submitted.
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.darkGrey,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 10
            }}
          >
            What happens next?
          </Text>
          <Text
            style={{ fontSize: 20, color: colors.darkGrey, marginBottom: 10 }}
          >
            One of our support team will be in contact shortly.
          </Text>
          <Text style={{ fontSize: 20, color: colors.darkGrey }}>
            Please share this information with the victim and let them know they
            will be receiving a call from an 0800 number.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={{
            marginHorizontal: 35,
            backgroundColor: colors.accent,
            height: 45,
            marginTop: 30
          }}
        >
          <Text
            style={{
              fontSize: 17,
              textAlign: "center",
              marginTop: 13,
              color: "white"
            }}
          >
            DONE
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
