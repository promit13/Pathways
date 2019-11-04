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
import colors from "../style";

const BookingHistorySingle = ({
  fullName,
  washType,
  time,
  date,
  profilePic,
  onPress
}) => {
  const dateFormat = date.split(" ");
  return (
    <View>
      <View
        style={{
          height: 170,
          backgroundColor: colors.accent,
          marginTop: 10,
          marginHorizontal: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginHorizontal: 20
          }}
        >
          <Avatar
            rounded
            size="medium"
            source={{
              uri: profilePic
            }}
          />
          <Text style={{ fontSize: 16, marginTop: 15 }}>{fullName}</Text>
          <TouchableOpacity
            style={{
              height: 40,
              width: 120,
              borderRadius: 20,
              backgroundColor: "black",
              justifyContent: "center",
              marginTop: 5
            }}
            onPress={onPress}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 12,
                fontWeight: "600"
              }}
            >
              View Booking
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
            marginVertical: 20
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 28, color: "white", fontWeight: "700" }}>
              {time}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "700",
                textAlign: "center"
              }}
            >
              P.M
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 28, color: "white", fontWeight: "700" }}>
              {dateFormat[0]}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "700",
                textAlign: "center"
              }}
            >
              {dateFormat[1]}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 28, color: "white", fontWeight: "700" }}>
              {washType}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "700",
                textAlign: "center"
              }}
            >
              wash
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingHistorySingle;
