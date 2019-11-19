import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../style";

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  text: {
    color: "white",
    alignSelf: "center",
    paddingBottom: moderateScale(10),
    fontSize: moderateScale(16)
  }
};

export default LoadScreen = ({ text }) => {
  console.log(text);
  return (
    <View style={styles.container}>
      {/* <StatusBar
        hidden
      /> */}
      <Text style={styles.text}>{text}</Text>
      <ActivityIndicator size="large" color="gray" style={{ marginTop: 20 }} />
    </View>
  );
};
