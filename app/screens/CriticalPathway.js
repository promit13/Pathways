import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Switch,
  Alert
} from "react-native";
import { Button, Input, Icon, Avatar, Rating } from "react-native-elements";
import SearchBarWrapper from "../components/SearchBar";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import logo from "../../assets/logo-shadow.png";
import UserDetails from "../components/UserDetails";
import colors from "../style";
import { Dropdown } from "react-native-material-dropdown";

export default class CriticalPathway extends React.Component {
  render() {
    return (
      <ScrollView>
        <SearchBarWrapper />
        <View style={{ backgroundColor: colors.accent, width: 10 }} />
        <View style={{ backgroundColor: colors.grey, width: "100%" }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.darkGrey,
              marginTop: 5,
              marginLeft: 25
            }}
          >
            ON A CRITICAL PATHWAY
          </Text>
        </View>
      </ScrollView>
    );
  }
}
