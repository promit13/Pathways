import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import colors from "../style";
import { ModalLoading } from "../components/LoadScreen";
import OfflineNotice from "../components/OfflineNotice";

const createReferralApi = "http://167.99.90.138:8675/createReferral";
const createTriageApi = "http://167.99.90.138:8675/createTriage";

const styles = {
  touchableStyle: {
    marginHorizontal: 35,
    backgroundColor: colors.accent,
    height: 45,
    justifyContent: "center",
    marginTop: 20
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    color: "white"
  }
};
class RepeatReferrals extends React.Component {
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
    if (!this.props.isConnected.isConnected) {
      return Alert.alert("No internet connection");
    }
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        {!this.props.isConnected.isConnected && <OfflineNotice />}
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Image
            source={require("../../assets/path-logo.png")}
            style={{
              alignSelf: "center",
              marginVertical: 20,
              color: colors.accent
            }}
          />

          <Text
            style={{
              fontSize: 20,
              color: colors.darkGrey,
              marginHorizontal: 40
            }}
          >
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
            <Text style={styles.textStyle}>
              NO - THIS IS NOT THE SAME VICTIM
            </Text>
          </TouchableOpacity>
          {this.state.loadscreen && <ModalLoading text="Please wait" />}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log("NETWORK STATUS", network);
  return {
    isConnected: network
  };
};

export default connect(mapStateToProps)(RepeatReferrals);
