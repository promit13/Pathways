import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../style";
import SearchBar from "react-native-material-design-searchbar";

const styles = {
  touchableStyle: {
    paddingVertical: moderateScale(20),
    marginRight: moderateScale(5),
    justifyContent: "center",
    flex: 1
  },
  textStyle: {
    textAlign: "center",
    fontSize: 12
  },
  viewItemContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: moderateScale(10)
  }
};
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
        <View style={styles.viewItemContainerStyle}>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                backgroundColor: this.props.sevenDays
                  ? colors.accent
                  : "transparent"
              }
            ]}
            onPress={this.props.sevenDaysPress}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  color: this.props.sevenDays ? "white" : colors.black
                }
              ]}
            >
              7 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                backgroundColor: this.props.thirtyDays
                  ? colors.accent
                  : "transparent"
              }
            ]}
            onPress={this.props.thirtyDaysPress}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  color: this.props.thirtyDays ? "white" : colors.black
                }
              ]}
            >
              30 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                backgroundColor: this.props.sixtyDays
                  ? colors.accent
                  : "transparent"
              }
            ]}
            onPress={this.props.sixtyDaysPress}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  color: this.props.sixtyDays ? "white" : colors.black
                }
              ]}
            >
              60 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                backgroundColor: this.props.ninetyDays
                  ? colors.accent
                  : "transparent"
              }
            ]}
            onPress={this.props.ninetyDaysPress}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  color: this.props.ninetyDays ? "white" : colors.black
                }
              ]}
            >
              90 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                backgroundColor: this.props.allDays
                  ? colors.accent
                  : "transparent"
              }
            ]}
            onPress={this.props.allDaysPress}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  color: this.props.allDays ? "white" : colors.black
                }
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>
        <SearchBar
          onSearchChange={this.props.onSearchChange}
          height={50}
          onFocus={() => console.log("On Focus")}
          onBlur={() => console.log("On Blur")}
          placeholder={"Search for victim"}
          placeholderColor={colors.darkGrey}
          autoCorrect={false}
          padding={10}
          returnKeyType={"search"}
        />
        {this.props.showDownBar && (
          <View style={styles.viewItemContainerStyle}>
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  backgroundColor: this.props.myReferrals
                    ? colors.accent
                    : "transparent"
                }
              ]}
              onPress={this.props.myReferralsPress}
            >
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: this.props.myReferrals ? "white" : colors.black
                  }
                ]}
              >
                My Referrals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  backgroundColor: this.props.myConstabulary
                    ? colors.accent
                    : "transparent"
                }
              ]}
              onPress={this.props.myConstabularyPress}
            >
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: this.props.myConstabulary ? "white" : colors.black
                  }
                ]}
              >
                My Organisations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  backgroundColor: this.props.nationalReferrals
                    ? colors.accent
                    : "transparent"
                }
              ]}
              onPress={this.props.nationalReferralsPress}
            >
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: this.props.nationalReferrals ? "white" : colors.black
                  }
                ]}
              >
                National Referrals
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
