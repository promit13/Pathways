import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import colors from "../style";
const BookingDetails = ({ user, booking, onPress }) => (
  <View>
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",

        display: "flex",
        flexDirection: "row",
        width: "100%",

        borderColor: colors.lightGrey,
        height: 50,
        borderWidth: 2,
        paddingHorizontal: 15,
        justifyContent: "center"
      }}
    >
      <View style={{ display: "flex", flexDirection: "column", flex: 8 }}>
        <Text
          style={{
            color: colors.darkGrey,
            flex: 10,
            fontSize: 20,
            marginTop: 2,
            marginLeft: 18
          }}
        >
          Jane Doe
        </Text>
        <Text style={{ fontSize: 15, color: colors.grey, marginLeft: 18 }}>
          24 August 1996
        </Text>
      </View>
      <Icon
        name="angle-right"
        type="font-awesome"
        color="black"
        containerStyle={{ flex: 1, justifyContent: "center" }}
      />
    </TouchableOpacity>
  </View>
);
export default BookingDetails;
