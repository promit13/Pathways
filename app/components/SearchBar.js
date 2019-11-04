import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import colors from "../style";
import { Dropdown } from "react-native-material-dropdown";
import SearchBar from "react-native-material-design-searchbar";

export default class SearchBarWrapper extends Component {
  state = {
    myFilter: false
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
            marginBottom: 20
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,

              marginRight: 5,
              justifyContent: "center",
              flex: 1,
              backgroundColor: this.state.sevenDays
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                sevenDays: !this.state.sevenDays
              })
            }
          >
            <Text
              style={{
                color: this.state.sevenDays ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              7 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,

              marginRight: 5,
              flex: 1,
              justifyContent: "center",
              backgroundColor: this.state.thirtyDays
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                thirtyDays: !this.state.thirtyDays
              })
            }
          >
            <Text
              style={{
                color: this.state.thirtyDays ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              30 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              flex: 1,
              marginRight: 5,
              justifyContent: "center",
              backgroundColor: this.state.sixtyDays
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                sixtyDays: !this.state.sixtyDays
              })
            }
          >
            <Text
              style={{
                color: this.state.sixtyDays ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              60 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              marginRight: 5,
              flex: 1,
              justifyContent: "center",
              backgroundColor: this.state.ninetyDays
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                ninetyDays: !this.state.ninetyDays
              })
            }
          >
            <Text
              style={{
                color: this.state.ninetyDays ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              90 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              flex: 1,
              justifyContent: "center",
              backgroundColor: this.state.allDays
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                allDays: !this.state.allDays
              })
            }
          >
            <Text
              style={{
                color: this.state.allDays ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>
        <SearchBar
          onSearchChange={() => console.log("On Search Change")}
          height={50}
          onFocus={() => console.log("On Focus")}
          onBlur={() => console.log("On Blur")}
          placeholder={"Search for victim"}
          placeholderColor={colors.darkGrey}
          autoCorrect={false}
          padding={10}
          returnKeyType={"search"}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginHorizontal: 5,
            marginTop: 10
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,

              paddingVertical: 8,
              paddingHorizontal: 8,
              marginRight: 5,
              justifyContent: "center",
              backgroundColor: this.state.myFilter
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                myFilter: !this.state.myFilter
              })
            }
          >
            <Text
              style={{
                color: this.state.myFilter ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              My Referrals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              paddingVertical: 8,
              paddingHorizontal: 8,
              marginRight: 5,
              justifyContent: "center",
              backgroundColor: this.state.myConstabulary
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                myConstabulary: !this.state.myConstabulary
              })
            }
          >
            <Text
              style={{
                color: this.state.myConstabulary ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              My Constabulary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,

              paddingVertical: 8,
              paddingHorizontal: 8,
              justifyContent: "center",
              backgroundColor: this.state.nationalReferrals
                ? colors.accent
                : "transparent"
            }}
            onPress={() =>
              this.setState({
                nationalReferrals: !this.state.nationalReferrals
              })
            }
          >
            <Text
              style={{
                color: this.state.nationalReferrals ? "white" : colors.accent,
                textAlign: "center",
                fontSize: 12
              }}
            >
              National Referrals
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
