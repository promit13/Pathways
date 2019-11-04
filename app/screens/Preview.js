import React from "react";
import {
  Image,
  Text,
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  FlatList,
  Picker,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Rating, Avatar, Icon } from "react-native-elements";
import firebase from "react-native-firebase";
import profilePicture from "../../assets/profilePicture.jpg";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AirbnbRating } from "react-native-elements";
import { Slider } from "react-native-elements";
import BookingSingle from "../components/BookingSingle";
import colors from "../style";
import axios from "axios";

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewCase")}
            style={{
              height: 60,

              display: "flex",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: colors.grey,
              alignSelf: "center",
              marginBottom: 30,
              marginHorizontal: 20,
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                flex: 4,
                display: "flex",
                marginTop: 16,
                justifyContent: "center",
                marginLeft: 20
              }}
            >
              Start a new referral
            </Text>
            <Image
              source={require("../../assets/plus.png")}
              resizeMode="contain"
              style={{
                display: "flex",
                flex: 1,
                alignSelf: "center",
                height: 25,
                width: 25
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ActiveCases")}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row",
              height: 80,
              borderColor: colors.grey,
              borderWidth: 2,
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent"
            }}
          >
            <Image
              source={require("../../assets/user.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 21,
                flex: 5,
                marginLeft: 10
              }}
            >
              Active cases
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: colors.darkGrey,
                textAlign: "center"
              }}
            >
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CompletedReferrals")}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row",
              height: 80,
              borderColor: colors.grey,
              borderWidth: 2,
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent"
            }}
          >
            <Image
              source={require("../../assets/tick.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 21,
                flex: 5,
                marginLeft: 10
              }}
            >
              Completed referrals
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: colors.darkGrey,

                textAlign: "center"
              }}
            >
              24
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("InjunctionServed")}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row",
              height: 80,
              borderColor: colors.grey,
              borderWidth: 2,
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent"
            }}
          >
            <Image
              source={require("../../assets/injunction.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 21,
                flex: 5,
                marginLeft: 10
              }}
            >
              Injunction served
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: colors.darkGrey,

                textAlign: "center"
              }}
            >
              24
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CriticalPathway")}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row",
              height: 80,
              borderColor: colors.grey,
              borderWidth: 2,
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent"
            }}
          >
            <Image
              source={require("../../assets/logo-circle.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 21,
                flex: 5,
                marginLeft: 10
              }}
            >
              On a critical pathway
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: colors.darkGrey,

                textAlign: "center"
              }}
            >
              24
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CasesFallen")}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row",
              height: 80,
              borderColor: colors.grey,
              borderWidth: 2,
              paddingHorizontal: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent"
            }}
          >
            <Image
              source={require("../../assets/cross.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 21,
                flex: 4,
                marginLeft: 10
              }}
            >
              Cases fallen through
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: colors.darkGrey,

                textAlign: "center"
              }}
            >
              100
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
