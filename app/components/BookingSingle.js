import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import colors from "../style";

const BookingSingle = ({ request, onPress }) => (
  <TouchableOpacity
    style={{
      height: request ? 240 : 180,
      backgroundColor: "white",
      marginHorizontal: 25,
      marginTop: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10
    }}
    onPress={onPress}
  >
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          backgroundColor: colors.accent,
          justifyContent: "center",
          marginLeft: 30,
          marginTop: 20,
          flexDirection: "column"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 26,
            color: "white",
            fontWeight: "700"
          }}
        >
          11
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "white",
            fontWeight: "500"
          }}
        >
          Jan
        </Text>
      </View>
      <View style={{ marginLeft: 30, marginTop: 20 }}>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>John Doe</Text>
        <Text style={{ fontSize: 15, fontWeight: "300" }}>
          123 Street Name, Town, City
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "300" }}>GU5 9RT</Text>
      </View>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 30,
        marginTop: 20
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "black"
          }}
        >
          4:30
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: request ? "white" : "black",
            fontSize: 14,
            fontWeight: "400"
          }}
        >
          PM
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "black"
          }}
        >
          Gold
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 14,
            fontWeight: "400"
          }}
        >
          Wash
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "black"
          }}
        >
          £25
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 14,
            fontWeight: "400"
          }}
        >
          Inc Vat
        </Text>
      </View>
    </View>
    <View style={{ flexDirection: "row", display: "flex" }}>
      <View
        style={{
          flex: 1,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          marginTop: 25
        }}
      >
        <Text>Decline</Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "green",
          marginTop: 25
        }}
      >
        <Text>Accept</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default BookingSingle;
