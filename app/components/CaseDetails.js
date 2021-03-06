import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../style";

const CaseDetails = ({ onPress, caseDetails }) => (
  <View>
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderColor: colors.lightGrey,
        borderWidth: 2,
        paddingHorizontal: 5,
        justifyContent: "center"
      }}
    >
      <View
        style={{
          display: "flex",
          paddingVertical: 10,
          flexDirection: "column",
          flex: 8,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: colors.darkGrey,
            flex: 10,
            fontSize: 20,
            marginLeft: 18
          }}
        >
          {caseDetails.Referral__r.Name}
        </Text>
        <Text style={{ fontSize: 15, color: colors.grey, marginLeft: 18 }}>
          {caseDetails.Referral__r.Date_of_Birth__c}
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

export default CaseDetails;
