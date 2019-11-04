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
import axios from "axios";

export default class InjunctionServed extends React.Component {
  render() {
    let data = [
      {
        value: "30 days"
      },
      {
        value: "60 days"
      },
      {
        value: "90 days"
      }
    ];
    return (
      <ScrollView>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <SearchBarWrapper />
          {/* <Dropdown
            inputContainerStyle={{
              borderBottomColor: "transparent",
              marginLeft: 10
            }}
            data={data}
            placeholder="Time period"
            containerStyle={{
              width: "45%",
              marginRight: "2.5%",
              marginLeft: "48.5%",
              borderWidth: 2,
              borderColor: colors.lightGrey
            }}
          /> */}
        </View>
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
            INJUNCTION SERVED
          </Text>
        </View>
      </ScrollView>
    );
  }
}
