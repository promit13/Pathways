import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import colors from "../style";

import { Formik } from "formik";

const styles = {
  textStyle: {
    color: colors.darkGrey,
    fontSize: 20,
    marginBottom: 10
  },
  buttonStyle: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    justifyContent: "center",
    marginTop: 30
  }
};
export default class ThankYou extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };

  render() {
    return (
      <ScrollView>
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 20
          }}
        />
        <View style={{ marginHorizontal: 40 }}>
          <Text style={[styles.textStyle, { fontSize: 30 }]}>Thank You!</Text>
          <Text style={styles.textStyle}>
            Your referral has been successfully submitted.
          </Text>
          <Text
            style={[
              styles.textStyle,
              {
                fontWeight: "700",
                marginTop: 20
              }
            ]}
          >
            What happens next?
          </Text>
          <Text style={styles.textStyle}>
            {`One of our support team will be in contact shortly.\n\nPlease share this information with the victim and let them know they will be receiving a call from an 0800 number.`}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Preview", {
                refresh: true
              })
            }
            style={styles.buttonStyle}
          >
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                color: "white"
              }}
            >
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
