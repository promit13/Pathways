import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";
import { Text } from "react-native-elements";
import axios from "axios";
import moment from "moment";
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
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" }
];

const createReferralApi = "http://localhost:8675/createReferral";
const getAccountApi = "http://localhost:8675/searchAccount";
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
    requireInjunction: null,
    organisationId: "",
    userId: ""
  };

  componentDidMount = async () => {
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    const { AccountId, Id } = jsonObjectData;
    this.setState({ organisationId: AccountId, userId: Id });
  };

  createTriageAndReferral = details => {
    axios
      .post(createReferralApi, details)
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

  searchAccountAndReferral = () => {
    const { userDetails } = this.props.navigation.state.params;
    console.log(userDetails);
    this.setState({ loadscreen: true });
    const {
      recentAbuse,
      pastAbuse,
      bailCondition,
      requireInjunction,
      organisationId,
      userId
    } = this.state;
    if (
      recentAbuse === null ||
      pastAbuse === null ||
      bailCondition === null ||
      requireInjunction === null
    ) {
      console.log("check");
      return this.setState({
        errorMessage: "Please answer all the question above",
        errorMessageVisible: true,
        loadscreen: false
      });
    }
    const date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log(formattedDate);
    const {
      name,
      dob,
      phone,
      safeContactNumber,
      safeEmail,
      message
    } = userDetails;
    const details = {
      name,
      dob,
      phone,
      safeContactNumber,
      safeEmail,
      message,
      status: "New",
      dateOfInstruction: formattedDate,
      referralSource: "App Referral",
      referrerContactName: userId,
      referrerOrganisation: organisationId,
      recentIncident: recentAbuse,
      pastIncident: pastAbuse,
      bailCondition,
      protectiveInjunction: requireInjunction
    };
    axios
      .post(getAccountApi, details)
      .then(res => {
        console.log(res);
        console.log(res.data.length);
        if (res.data.length > 0) {
          this.setState({ loadscreen: false });
          const referralId = res.data[0].Id;
          this.props.navigation.navigate("RepeatReferrals", {
            userDetails: { ...details, referralId }
          });
        } else {
          this.createTriageAndReferral(details);
        }
      })
      .catch(err => {
        this.setState({ loadscreen: false });
        console.log(err);
      });
  };

  renderQuestions = () => {
    return (
      <View>
        <Text style={styles.dayTextStyle}>
          Has there been a recent incident of domestic abuse?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ recentAbuse: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
        <Text style={styles.dayTextStyle}>
          Is there a prior history of domestic abuse?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ pastAbuse: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
        <Text style={styles.dayTextStyle}>
          Are there any bail conditions currently in place?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ bailCondition: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
        <Text style={styles.dayTextStyle}>
          Do you feel the victim requires a protective injunction?
        </Text>
        <RNPickerSelect
          onValueChange={value => this.setState({ requireInjunction: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
      </View>
    );
  };

  render() {
    const { errorMessageVisible, errorMessage, loadscreen } = this.state;
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
              () => this.searchAccountAndReferral()
              // () => this.props.navigation.navigate("Questions")
              // () => this.props.navigation.navigate("RepeatReferrals")
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
