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

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import logo from "../../assets/logo-shadow.png";
import UserDetails from "../components/UserDetails";
import colors from "../style";
import { Dropdown } from "react-native-material-dropdown";
import BookingDetails from "../components/BookingDetails";
import SearchBarWrapper from "../components/SearchBar";

export default class ActiveCases extends React.Component {
  // state = {
  //   showActiveCases: true
  // };

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
    //const { showActiveCases } = this.state;

    return (
      <ScrollView>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#F1F3F2",
            borderTopWidth: 2,
            borderTopColor: "#F1F3F2"
          }}
        >
          <View style={{ marginBottom: -30 }}>
            <SearchBarWrapper />
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "80%",
              justifyContent: "center",
              display: "flex"
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              height: 35,
              borderTopWidth: 2,
              borderTopColor: colors.lightGrey
            }}
          >
            <View
              style={{
                backgroundColor: colors.grey,
                width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.darkGrey,
                  marginTop: 5,
                  color: "white",
                  marginLeft: 25
                }}
              >
                PENDING
              </Text>
            </View>
          </View>
          <BookingDetails
            onPress={() => this.props.navigation.navigate("Case")}
          />
          <BookingDetails
            onPress={() => this.props.navigation.navigate("Case")}
          />
          <BookingDetails
            onPress={() => this.props.navigation.navigate("Case")}
          />
          <View
            style={{
              flexDirection: "row",
              height: 35
            }}
          >
            <View style={{ backgroundColor: colors.grey, width: "100%" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.darkGrey,
                  marginTop: 5,
                  color: "white",
                  marginLeft: 25
                }}
              >
                APPLIED FOR
              </Text>
            </View>
          </View>
          <BookingDetails />
          <BookingDetails />
          <BookingDetails />
          {/* <Icon
            name="plus-square-o"
            type="font-awesome"
            onPress={() => this.setState({ showActiveCases: !showActiveCases })}
            iconStyle={{
              position: "absolute",

              bottom: -10,
              right: 20,
              color: colors.darkGrey
            }}
          /> */}
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              height: 35
            }}
          >
            <View style={{ backgroundColor: colors.grey, width: "100%" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  marginTop: 5,
                  marginLeft: 25
                }}
              >
                CONTACT MADE
              </Text>
            </View>
          </View>
          {/* {showActiveCases ? (
            <View>
              <BookingDetails
                onPress={() => this.props.navigation.navigate("Case")}
              />
              <BookingDetails
                onPress={() => this.props.navigation.navigate("Case")}
              />
              <BookingDetails
                onPress={() => this.props.navigation.navigate("Case")}
              />
            </View>
          ) : null} */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              height: 35
            }}
          >
            <View style={{ backgroundColor: colors.grey, width: "100%" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  marginTop: 5,
                  marginLeft: 25
                }}
              >
                INJUNCTION GRANTED
              </Text>
            </View>
          </View>
          <BookingDetails />
          <BookingDetails />
          <BookingDetails />
          <View
            style={{
              flexDirection: "row",
              height: 35
            }}
          >
            <View style={{ backgroundColor: colors.grey, width: "100%" }}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  color: "white",
                  marginLeft: 25
                }}
              >
                INJUNCTION NOT GRANTED
              </Text>
            </View>
          </View>
        </View>
        <BookingDetails />
        <BookingDetails />
        <BookingDetails />
      </ScrollView>
    );
  }
}
