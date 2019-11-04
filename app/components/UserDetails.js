import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../style";

const UserDetails = ({
  darkMode,
  bordered,
  washes,
  pictures,
  reviews,
  rating,
  fullName
}) => (
  <View>
    <Text
      style={{
        fontSize: 20,
        color: "white",
        alignText: "center",
        fontWeight: "700",
        alignContent: "center",
        alignSelf: "center",
        marginTop: 20
      }}
    >
      John Doe
    </Text>

    <TouchableOpacity
      style={{
        justifyContent: "center",
        height: 40,
        width: 100,
        borderRadius: 40,
        backgroundColor: "white",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15
      }}
    >
      <Text>Book me</Text>
    </TouchableOpacity>
  </View>
);

export default UserDetails;
