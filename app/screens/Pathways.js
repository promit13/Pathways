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
import { connect } from "react-redux";
import colors from "../style";
import BookingHistorySingle from "../components/BookingHistorySingle";

export default class Pathways extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View>
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 40
          }}
        />
        <Text
          style={{
            color: colors.darkGrey,
            fontSize: 20,
            marginHorizontal: 60,
            marginBottom: 30
          }}
        >
          Welcome to Pathway, please select the recovery pathway you wish to
          use.
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Preview")}
          style={{
            height: 80,
            display: "flex",
            flexDirection: "row",
            borderWidth: 2,
            borderColor: colors.grey,
            alignSelf: "center",
            borderBottomWidth: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.darkGrey,
              flex: 4,
              display: "flex",
              justifyContent: "center",
              marginLeft: 60,
              marginTop: 24
            }}
          >
            Domestic Abuse Pathway
          </Text>
          <Image
            source={require("../../assets/arrow-right.png")}
            resizeMode="contain"
            style={{
              display: "flex",
              flex: 1,
              alignSelf: "center",
              height: 25
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
