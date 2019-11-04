import React from "react";
import { Text, Dimensions, View } from "react-native";
import { Button, Rating, Avatar, Icon } from "react-native-elements";

var { height, width } = Dimensions.get("window");

const ReviewSingleItem = () => {
  return (
    <View
      style={{
        width: width,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E3F1FD"
      }}
    >
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View>
          <Avatar rounded title="O" size={40} />
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 16 }}>User One</Text>
          <Text style={{ fontSize: 12, fontWeight: "100" }}>
            April 29, 2019
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "right" }}>4.0</Text>
        </View>
      </View>
      <Text style={{ marginTop: 20 }}>
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts
      </Text>
    </View>
  );
};

export default ReviewSingleItem;
