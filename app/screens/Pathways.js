import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
  BackHandler,
  KeyboardAvoidingView
} from "react-native";
import firebase from "react-native-firebase";
import colors from "../style";
import LoadScreen, { ModalLoading } from "../components/LoadScreen";

const styles = {
  textStyle: {
    color: colors.darkGrey,
    fontSize: 20
  },
  resetText: {
    color: "blue",
    textAlign: "center"
  },
  touchableStyle: {
    marginVertical: 30,
    alignItems: "center"
  }
};

export default class Pathways extends Component {
  state = {
    myId: "",
    loading: false,
    loadScreen: true,
    hardWareBackButton: true
  };
  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    this.setState({
      myId: jsonObjectData.Id,
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
    const { myId, loadScreen } = this.state;
    console.log(myId);
    if (loadScreen) return <LoadScreen text="Please wait" />;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
        enabled
        style={{ flex: 1 }}
      >
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 40
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.darkGrey,
              fontSize: 20,
              marginBottom: 30,
              paddingHorizontal: 20,
              marginLeft: 10
            }}
          >
            Welcome to Pathway, please select the recovery pathway you wish to
            use.
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ hardWareBackButton: false });
              this.props.navigation.navigate("Preview");
            }}
            style={{
              paddingVertical: 20,
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: colors.grey,
              borderBottomWidth: 2,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingHorizontal: 30,
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                display: "flex",
                justifyContent: "center"
              }}
            >
              Domestic Abuse Pathway
            </Text>
            <Image
              source={require("../../assets/arrow-right.png")}
              resizeMode="contain"
              style={{
                display: "flex",
                alignSelf: "center",
                height: 25
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              this.logout();
            }}
          >
            <Text style={styles.resetText}>Not you? Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              {
                marginTop: 20
              }
            ]}
            onPress={() => {
              this.sendEmail();
            }}
          >
            <Text style={[styles.resetText, { color: "blue" }]}>
              Report Issues
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
