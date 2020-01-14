import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  BackHandler,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";
import colors from "../style";
import LoadScreen, { ModalLoading } from "../components/LoadScreen";
import OfflineNotice from "../components/OfflineNotice";

const styles = {
  textStyle: {
    color: colors.black,
    fontSize: 20
  },
  resetText: {
    color: "white",
    textAlign: "center"
  },
  touchableStyle: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colors.accent,
    paddingVertical: 20,
    alignItems: "center"
  }
};

class Pathways extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    loading: false,
    loadScreen: true,
    hardWareBackButton: true
  };
  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    this.setState({
      loadScreen: false,
      hardWareBackButton: true
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    return this.state.hardWareBackButton;
  };

  logout = async () => {
    await AsyncStorage.getAllKeys((err, keys) => {
      console.log(keys);
      AsyncStorage.multiRemove(keys);
    });
    this.setState({
      showModalMessage: false,
      loading: false,
      showError: false,
      errorMessage: ""
    });
    firebase.auth().signOut();
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(myId)
    //   .update({
    //     phoneVerified: false,
    //     pinSet: false,
    //     userVerified: false
    //   })
    //   .then(async () => {
    //     this.setState({
    //       showModalMessage: false,
    //       loading: false,
    //       showError: false,
    //       errorMessage: ""
    //     });
    //     await AsyncStorage.getAllKeys((err, keys) => {
    //       AsyncStorage.multiRemove(keys);
    //     });
    //     firebase.auth().signOut();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  sendEmail = () => {
    Linking.openURL("mailto:support@socialdynamics.org?subject=PATHWAYS&body=");
  };

  render() {
    const { loadScreen } = this.state;
    if (loadScreen) return <LoadScreen text="Please wait" />;
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        {!this.props.isConnected.isConnected && (
          <View style={{ marginTop: 40 }}>
            <OfflineNotice />
          </View>
        )}
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 40,
            color: colors.accent,
            marginBottom: 20
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              marginBottom: 30,
              paddingHorizontal: 20,
              marginLeft: 10
            }}
          >
            Welcome to Pathways, please select the recovery pathway you wish to
            use.
          </Text>
          <View></View>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.setState({ hardWareBackButton: false });
              this.props.navigation.navigate("Preview");
            }}
            style={{
              paddingVertical: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: colors.grey,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingHorizontal: 30
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.black
              }}
            >
              Domestic Abuse Pathway
            </Text>
            <Icon
              name="chevron-small-right"
              type="entypo"
              color={colors.accent}
              size={40}
              iconStyle={{ marginTop: 10 }}
            />
          </TouchableOpacity>
          <View style={{ width: "100%", position: "absolute", bottom: 0 }}>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                if (!this.props.isConnected.isConnected) {
                  return Alert.alert("No internet connection");
                }
                this.logout();
              }}
            >
              <Text style={styles.resetText}>Not you? Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  marginTop: 10,
                  marginBottom: 35,
                  backgroundColor: colors.grey
                }
              ]}
              onPress={() => {
                if (!this.props.isConnected.isConnected) {
                  return Alert.alert("No internet connection");
                }
                this.sendEmail();
              }}
            >
              <Text style={[styles.resetText, { color: colors.darkGrey }]}>
                Report Issues
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

export default connect(mapStateToProps)(Pathways);
