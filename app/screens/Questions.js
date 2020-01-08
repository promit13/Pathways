import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import ErrorMessage from "../components/Error";
import { ModalLoading } from "../components/LoadScreen";
import colors from "../style";
import OfflineNotice from "../components/OfflineNotice";

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
    marginTop: 10,
    paddingLeft: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 4,
    borderWidth: 2,
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

const createReferralApi = "http://167.99.90.138:8675/createReferral";
const getAccountApi = "http://167.99.90.138:8675/searchAccount";
class Questions extends React.Component {
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
    recentCheckedYes: false,
    recentCheckedNo: false,
    pastCheckedYes: false,
    pastCheckedNo: false,
    bailCheckedYes: false,
    bailCheckedNo: false,
    injunctionCheckedYes: false,
    injunctionCheckedNo: false,
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
        this.setState({
          loadscreen: false,
          errorMessageVisible: false,
          errorMessage: ""
        });
        this.props.navigation.navigate("ThankYou");
      })
      .catch(err => {
        this.setState({
          loadscreen: false,
          errorMessageVisible: true,
          errorMessage: "Something went wrong. Please try again."
        });
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
      return this.setState({
        loadscreen: false,
        errorMessageVisible: true,
        errorMessage: "Please answer all questions"
      });
    }
    const date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log(formattedDate);
    const {
      firstName,
      lastName,
      dob,
      phone,
      safeContactNumber,
      safeEmail,
      message,
      clientConsent
    } = userDetails;
    var res = dob.split("/");
    const splitDate = new Date(res[2], res[1] - 1, res[0]);
    const newDOB = moment(splitDate).format("YYYY-MM-DD");
    const details = {
      firstName,
      lastName,
      dob: newDOB,
      phone,
      safeContactNumber: safeContactNumber === "" ? phone : safeContactNumber,
      safeEmail,
      message,
      clientConsent,
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
          this.setState({
            loadscreen: false,
            errorMessageVisible: false,
            errorMessage: ""
          });
          const referralId = res.data[0].Id;
          this.props.navigation.navigate("RepeatReferrals", {
            userDetails: { ...details, referralId }
          });
        } else {
          this.createTriageAndReferral(details);
        }
      })
      .catch(err => {
        this.setState({
          loadscreen: false,
          errorMessageVisible: true,
          errorMessage: "Something went wrong. Please try again."
        });
        console.log(err);
      });
  };

  renderCheckBox = (
    checkBoxYesState,
    checkBoxNoState,
    yesKey,
    noKey,
    questionKey
  ) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <CheckBox
          checkedColor={colors.accent}
          title="Yes"
          containerStyle={{ backgroundColor: "white", borderColor: "white" }}
          checked={checkBoxYesState}
          onIconPress={() => {
            this.setState({
              [yesKey]: true,
              [noKey]: false,
              [questionKey]: "Yes"
            });
          }}
        />
        <CheckBox
          checkedColor={colors.accent}
          containerStyle={{ backgroundColor: "white", borderColor: "white" }}
          title="No"
          checked={checkBoxNoState}
          onIconPress={() => {
            this.setState({
              [yesKey]: false,
              [noKey]: true,
              [questionKey]: "No"
            });
          }}
        />
      </View>
    );
  };

  renderQuestions = () => {
    const {
      recentCheckedYes,
      recentCheckedNo,
      pastCheckedYes,
      pastCheckedNo,
      bailCheckedNo,
      bailCheckedYes,
      injunctionCheckedNo,
      injunctionCheckedYes
    } = this.state;
    return (
      <View>
        <Text style={styles.dayTextStyle}>
          Has there been a recent incident of domestic abuse?
        </Text>
        {this.renderCheckBox(
          recentCheckedYes,
          recentCheckedNo,
          "recentCheckedYes",
          "recentCheckedNo",
          "recentAbuse"
        )}
        <Text style={styles.dayTextStyle}>
          Is there a prior history of domestic abuse?
        </Text>
        {this.renderCheckBox(
          pastCheckedYes,
          pastCheckedNo,
          "pastCheckedYes",
          "pastCheckedNo",
          "pastAbuse"
        )}
        <Text style={styles.dayTextStyle}>
          Are there any bail conditions currently in place?
        </Text>
        {this.renderCheckBox(
          bailCheckedYes,
          bailCheckedNo,
          "bailCheckedYes",
          "bailCheckedNo",
          "bailCondition"
        )}
        <Text style={styles.dayTextStyle}>
          Do you feel the victim requires a protective injunction?
        </Text>
        {this.renderCheckBox(
          injunctionCheckedYes,
          injunctionCheckedNo,
          "injunctionCheckedYes",
          "injunctionCheckedNo",
          "requireInjunction"
        )}
        {/* <RNPickerSelect
          onValueChange={value => this.setState({ requireInjunction: value })}
          items={pickerItems}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        /> */}
      </View>
    );
  };

  render() {
    const {
      errorMessageVisible,
      errorMessage,
      loadscreen,
      recentAbuse,
      pastAbuse,
      bailCondition,
      requireInjunction
    } = this.state;
    console.log(recentAbuse, pastAbuse, bailCondition, requireInjunction);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30 }}
      >
        {!this.props.isConnected.isConnected && <OfflineNotice />}
        <View style={{ flex: 1, paddingHorizontal: 30 }}>
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
              marginBottom: 20
            }}
          >
            We now need to learn more about the case. Please select an answer
            for each question to continue.
          </Text>
          {this.renderQuestions()}
          {errorMessageVisible && (
            <ErrorMessage errorMessage={errorMessage} marginLeft={10} />
          )}
          {loadscreen && <ModalLoading text="Please wait" />}

          <TouchableOpacity
            onPress={
              () => {
                if (!this.props.isConnected.isConnected) {
                  return Alert.alert("No internet connection");
                }
                this.searchAccountAndReferral();
              }
              // () => this.props.navigation.navigate("Questions")
              // () => this.props.navigation.navigate("RepeatReferrals")
              // firebase.auth().signOut()
            }
            style={{
              marginHorizontal: 40,
              marginTop: 10,
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
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log("NETWORK STATUS", network);
  return {
    isConnected: network
  };
};

export default connect(mapStateToProps)(Questions);
