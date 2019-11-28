import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";
import colors from "../style";
import { ModalLoading } from "../components/LoadScreen";

const createReferralApi = "http://167.71.142.150:8675/createReferral";
const createTriageApi = "http://167.71.142.150:8675/createTriage";

const styles = {
  touchableStyle: {
    marginHorizontal: 35,
    backgroundColor: colors.accent,
    height: 45,
    justifyContent: "center",
    marginTop: 20
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
    color: "white"
  }
};
export default class RepeatReferrals extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };

  state = {
    loadscreen: false
  };

  createTriageAndReferral = check => {
    this.setState({ loadscreen: true });
    const { userDetails } = this.props.navigation.state.params;
    console.log(userDetails);
    this.setState({ loadscreen: true });
    const api = check ? createTriageApi : createReferralApi;
    console.log(api);
    axios
      .post(api, userDetails)
      .then(res => {
        console.log(res);
        this.setState({ loadscreen: false });
        this.props.navigation.navigate("ThankYou");
      })
      .catch(err => {
        this.setState({ loadscreen: false });
        console.log(err);
      });
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 20
          }}
        />

        <Text style={{ fontSize: 20, color: colors.darkGrey, margin: 40 }}>
          {`The victim is already in the system with a matching name and date of birth.\n\nPlease ask the victim if they have been referred before to their knowledge.\n\nIf the victim is not sure please click NO.`}
        </Text>
        <TouchableOpacity
          onPress={() => this.createTriageAndReferral(true)}
          style={styles.touchableStyle}
        >
          <Text style={styles.textStyle}>YES - THIS IS THE SAME VICTIM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.createTriageAndReferral(false)}
          style={styles.touchableStyle}
        >
          <Text style={styles.textStyle}>NO - THIS IS NOT THE SAME VICTIM</Text>
        </TouchableOpacity>
        {this.state.loadscreen && <ModalLoading text="Please wait" />}
      </ScrollView>
    );
  }
}
