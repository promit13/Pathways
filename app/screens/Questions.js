import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { Text, Button } from "react-native-elements";
import firebase from "react-native-firebase";
import RNPickerSelect from "react-native-picker-select";
import ErrorMessage from "../components/Error";
import { ModalLoading } from "../components/LoadScreen";
import colors from "../style";

const styles = StyleSheet.create({
  dayTextStyle: {
    fontSize: 18,
    color: "grey",
    marginTop: 15
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
const pickerItems = [
  { label: "Yes", value: true },
  { label: "No", value: false }
];

export default class Questions extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };

  state = {
    errorMessage: "",
    errorMessageVisible: true,
    loadscreen: false,
    recentAbuse: null,
    pastAbuse: null,
    bailCondition: null,
    requireInjunction: null
  };

  registerAnswers = () => {
    console.log("CHECK");
    this.setState({ loadscreen: true });
    const {
      recentAbuse,
      pastAbuse,
      bailCondition,
      requireInjunction
    } = this.state;
    const { user } = this.props.navigation.state.params;
    if (
      recentAbuse === null ||
      pastAbuse === null ||
      bailCondition === null ||
      requireInjunction === null
    ) {
      console.log("check");
      return this.setState({
        errorMessage: "Please fill in all section",
        errorMessageVisible: true,
        loadscreen: false
      });
    }
    const userDetails = {
      recentAbuse,
      pastAbuse,
      bailCondition,
      requireInjunction
    };
    firebase
      .firestore()
      .collection("users")
      .doc(user.userId)
      .update({
        questionsRegistered: true
      })
      .then(() => {
        this.setState({
          errorMessage: "",
          errorMessageVisible: false,
          loadscreen: false
        });
      })
      .catch(err => {
        this.setState({
          errorMessage: "",
          errorMessageVisible: false,
          loadscreen: false
        });
      });
  };

  renderQuestions = () => {
    return (
      <View>
        <Text style={styles.dayTextStyle}>
          Has there been a recent incident of domestic abuse?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ counselling: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
        <Text style={styles.dayTextStyle}>
          Is there a prior history of domestic abuse?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ sadness: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
        <Text style={styles.dayTextStyle}>
          Are there any bail conditions currently in place?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ anxiety: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
        <Text style={styles.dayTextStyle}>
          Do you feel the victim requires a protective injunction?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ suicidal: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
      </View>
    );
  };

  render() {
    const platform = Platform.OS;
    const {
      errorMessageVisible,
      errorMessage,
      loadscreen,
      gender,
      ageGroup,
      counselling,
      sadness,
      anxiety,
      suicidal,
      phobias
    } = this.state;
    console.log(gender, ageGroup, counselling, sadness, anxiety, suicidal);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingHorizontal: 35 }}>
          <Image
            source={require("../../assets/path-logo.png")}
            style={{
              alignSelf: "center",
              marginTop: 20,
              color: colors.accent,
              marginBottom: 20
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              color: colors.accent,
              marginTop: 30,
              marginBottom: 30
            }}
          >
            Perfect! We now need to learn a little bit more about you.
          </Text>
          {this.renderQuestions()}
          {errorMessageVisible && (
            <ErrorMessage errorMessage={errorMessage} marginLeft={10} />
          )}
          {loadscreen && <ModalLoading text="Please wait" />}

          <TouchableOpacity
            onPress={
              // () => this.props.navigation.navigate("Questions")
              () => this.props.navigation.navigate("RepeatReferrals")
              // firebase.auth().signOut()
            }
            style={{
              marginHorizontal: 40,
              marginTop: 20,
              color: "white",
              height: 45,
              backgroundColor: colors.accent
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: 12,
                color: "white",
                fontSize: 17
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
