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

export default class RepeatReferrals extends React.Component {
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
        <View style={{ marginHorizontal: 40 }}>
          <Text style={{ fontSize: 20, color: colors.darkGrey }}>
            The victim is already in the system with a matchin name and date of
            birth.
          </Text>
          <Text style={{ fontSize: 20, color: colors.darkGrey, marginTop: 10 }}>
            Please ask the victim if they have been referred before to their
            knowledge.
          </Text>
          <Text style={{ fontSize: 20, color: colors.darkGrey, marginTop: 10 }}>
            If the victim is not sure please click NO.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ThankYou")}
          style={{
            marginHorizontal: 35,
            backgroundColor: colors.accent,
            height: 45,
            marginTop: 20
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
            YES - THIS IS THE SAME VICTIM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ThankYou")}
          style={{
            marginHorizontal: 35,
            backgroundColor: colors.accent,
            height: 45,
            marginTop: 15
          }}
        >
          <Text
            style={{
              fontSize: 17,
              marginLeft: 10,
              marginTop: 13,
              color: "white",
              textAlign: "center"
            }}
          >
            NO - THIS IS NOT THE SAME VICTIM
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
