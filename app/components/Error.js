import React from "react";
import { Text } from "react-native";

const styles = {
  textStyle: {
    color: "red",
    fontSize: 16
  }
};

export default ErrorMessage = ({ errorMessage, marginLeft, marginTop }) => {
  return (
    <Text style={[styles.textStyle, { marginLeft, marginTop }]}>
      {errorMessage}
    </Text>
  );
};
