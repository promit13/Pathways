import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import moment from "moment";
import { withNavigation } from "react-navigation";
import colors from "../style";
import axios from "axios";
import BookingDetails from "../components/BookingDetails";
import SearchBarWrapper from "../components/SearchBar";
import LoadScreen from "../components/LoadScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const titles = ["Awaiting to be Contacted"];
const allTitles = [
  "Awaiting to be Contacted",
  "Contacting",
  "Contact Made",
  "Live"
];
class ActiveCases extends React.Component {
  static navigationOptions = {
    // title: "Register",
    // headerTitleStyle: {
    //   fontWeight: "bold",
    //   fontSize: 20
    // }
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };
  state = {
    activeCases: [],
    activeCaseCheck: false,
    arrayTitle: "",
    searchKey: "",
    sevenDays: true,
    thirtyDays: false,
    sixtyDays: false,
    ninetyDays: false,
    allDays: false,
    myReferrals: true,
    myConstabulary: false,
    nationalReferrals: false,
    checkDays: null,
    loadScreen: true,
    accountId: "",
    myId: ""
  };

  componentDidMount = async () => {
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    const { AccountId, Id } = jsonObjectData;
    console.log(jsonObjectData);
    console.log(AccountId, Id);
    if (this.props.navigation.state.params === undefined) {
      axios.get("http://167.71.142.150:8675/referrals").then(res => {
        console.log(res.data.records);
        this.setState({
          activeCases: res.data.records,
          activeCaseCheck: true,
          loadScreen: false,
          accountId: AccountId,
          myId: Id
        });
      });
    } else {
      const {
        casesArray,
        activeCaseCheck,
        arrayTitle
      } = this.props.navigation.state.params;
      console.log(casesArray);
      this.setState({
        activeCases: casesArray,
        activeCaseCheck,
        arrayTitle,
        loadScreen: false,
        accountId: AccountId,
        myId: Id
      });
    }
  };

  // buttonPress = i => {
  //   const {
  //     sevenDays,
  //     thirtyDays,
  //     sixtyDays,
  //     ninetyDays,
  //     allDays,
  //     myReferrals,
  //     myConstabulary,
  //     nationalReferrals
  //   } = this.state;
  //   this.setState({
  //     sevenDays: sevenDays || i === 0 ? !this.state.sevenDays : false,
  //     thirtyDays: thirtyDays || i === 1 ? !this.state.thirtyDays : false,
  //     sixtyDays: sixtyDays || i === 2 ? !this.state.sixtyDays : false,
  //     ninetyDays: ninetyDays || i === 3 ? !this.state.ninetyDays : false,
  //     allDays: allDays || i === 4 ? !this.state.allDays : false,
  //     myReferrals: myReferrals || i === 5 ? !this.state.myReferrals : false,
  //     myConstabulary:
  //       myConstabulary || i === 6 ? !this.state.myConstabulary : false,
  //     nationalReferrals:
  //       nationalReferrals || i === 7 ? !this.state.nationalReferrals : false
  //   });
  // };

  buttonPress = i => {
    const {
      sevenDays,
      thirtyDays,
      sixtyDays,
      ninetyDays,
      allDays,
      myReferrals,
      myConstabulary,
      nationalReferrals
    } = this.state;
    this.setState({
      sevenDays:
        i === 1 || i === 2 || i === 3 || i === 4
          ? false
          : sevenDays || i === 5 || i === 6 || i === 7
          ? sevenDays
          : !this.state.sevenDays,
      thirtyDays:
        i === 0 || i === 2 || i === 3 || i === 4
          ? false
          : thirtyDays || i === 5 || i === 6 || i === 7
          ? thirtyDays
          : !this.state.thirtyDays,
      sixtyDays:
        i === 0 || i === 1 || i === 3 || i === 4
          ? false
          : sixtyDays || i === 5 || i === 6 || i === 7
          ? sixtyDays
          : !this.state.sixtyDays,
      ninetyDays:
        i === 0 || i === 1 || i === 2 || i === 4
          ? false
          : ninetyDays || i === 5 || i === 6 || i === 7
          ? ninetyDays
          : !this.state.ninetyDays,
      allDays:
        i === 0 || i === 1 || i === 2 || i === 3
          ? false
          : allDays || i === 5 || i === 6 || i === 7
          ? allDays
          : !this.state.allDays,
      myReferrals:
        i === 6 || i === 7
          ? false
          : myReferrals || i === 0 || i === 1 || i === 2 || i === 3 || i === 4
          ? myReferrals
          : !this.state.myReferrals,
      myConstabulary:
        i === 5 || i === 7
          ? false
          : myConstabulary ||
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4
          ? myConstabulary
          : !this.state.myConstabulary,
      nationalReferrals:
        i === 5 || i === 6
          ? false
          : nationalReferrals ||
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4
          ? nationalReferrals
          : !this.state.nationalReferrals
    });
  };

  renderContent = status => {
    const casesList = Object.values(status)[0].map(caseDetails => {
      return (
        <BookingDetails
          caseDetails={caseDetails}
          onPress={() =>
            this.props.navigation.navigate("Case", {
              caseDetails
            })
          }
        />
      );
    });
    return casesList;
  };

  render() {
    const {
      activeCases,
      activeCaseCheck,
      arrayTitle,
      sevenDays,
      thirtyDays,
      sixtyDays,
      ninetyDays,
      allDays,
      myReferrals,
      myConstabulary,
      nationalReferrals,
      // checkDays,
      loadScreen,
      accountId,
      myId
    } = this.state;
    const checkDays = sevenDays ? 7 : thirtyDays ? 30 : sixtyDays ? 60 : 90;
    let filteredArray = [];
    const todayDate = new Date();
    const toDate = moment(todayDate).subtract(checkDays, "d");
    const searchFilteredArray = activeCases.filter(item => {
      const isBetween = allDays
        ? true
        : moment(item.CreatedDate).isBetween(toDate, todayDate);
      console.log(isBetween, checkDays);
      // if (checkDays === null) {

      if (myReferrals) {
        return (
          item.Referral__r &&
          item.Referral__r.Referrer_Contact_Name__c === myId &&
          isBetween &&
          item.Referral__r.Name.includes(this.state.searchKey)
        );
      }
      if (myConstabulary) {
        console.log("my consta");
        return (
          item.Referral__r &&
          item.Referral__r.Referrer_Organisation__c === accountId &&
          isBetween &&
          item.Referral__r.Name.includes(this.state.searchKey)
        );
      }
      console.log("national");
      return (
        item.Referral__r &&
        isBetween &&
        item.Referral__r.Name.includes(this.state.searchKey)
      );
      //  }
      // return (
      //   item.Referral__r &&
      //   isBetween &&
      //   item.Referral__r.Name.includes(this.state.searchKey) //startsWith
      // );
    });
    if (activeCaseCheck) {
      allTitles.map(title => {
        const filteredTitle = searchFilteredArray.filter(caseDetails => {
          return caseDetails.Triage_Status__c === title;
        });
        const myReferrals = searchFilteredArray.filter(caseDetails => {
          return caseDetails.Triage_Status__c === title;
        });
        return filteredArray.push({ [title]: filteredTitle });
      });
    } else {
      filteredArray.push({ [arrayTitle]: searchFilteredArray });
    }
    if (loadScreen) return <LoadScreen text="Please wait" />;
    console.log(filteredArray);
    return (
      // <SafeAreaView
      //   forceInset={{ bottom: "always" }}
      //   style={{
      //     borderBottomWidth: 2,
      //     borderBottomColor: "#F1F3F2",
      //     borderTopWidth: 2,
      //     borderTopColor: "#F1F3F2"
      //   }}
      // >
      <KeyboardAvoidingView
        behavior="padding"
        behavior={Platform.OS === "android" ? "" : "padding"}
        style={{
          borderBottomWidth: 2,
          borderBottomColor: "#F1F3F2",
          borderTopWidth: 2,
          borderTopColor: "#F1F3F2"
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBarWrapper
            onSearchChange={searchKey => {
              this.setState({ searchKey });
              console.log(searchKey);
            }}
            sevenDaysPress={() => {
              // this.setState({ checkDays: 7 });
              this.buttonPress(0);
            }}
            thirtyDaysPress={() => {
              // this.setState({ checkDays: 30 });
              this.buttonPress(1);
            }}
            sixtyDaysPress={() => {
              // this.setState({ checkDays: 60 });
              this.buttonPress(2);
            }}
            ninetyDaysPress={() => {
              // this.setState({ checkDays: 90 });
              this.buttonPress(3);
            }}
            allDaysPress={() => {
              // this.setState({ checkDays: null });
              this.buttonPress(4);
            }}
            myReferralsPress={() => {
              // this.setState({ checkDays: null });
              this.buttonPress(5);
            }}
            myConstabularyPress={() => {
              // this.setState({ checkDays: null });
              this.buttonPress(6);
            }}
            nationalReferralsPress={() => {
              // this.setState({ checkDays: null });
              this.buttonPress(7);
            }}
            sevenDays={sevenDays}
            thirtyDays={thirtyDays}
            sixtyDays={sixtyDays}
            ninetyDays={ninetyDays}
            allDays={allDays}
            myReferrals={myReferrals}
            myConstabulary={myConstabulary}
            nationalReferrals={nationalReferrals}
          />
          <View
            style={{
              height: 20
            }}
          />
          {filteredArray.map(status => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    height: 35,
                    borderTopWidth: 2,
                    borderTopColor: colors.lightGrey
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.grey,
                      width: "100%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.darkGrey,
                        marginTop: 5,
                        color: "white",
                        marginLeft: 25,
                        textTransform: "uppercase"
                      }}
                    >
                      {Object.keys(status)}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* {this.renderContent(i + 1, episodeValue)} */}
                {this.renderContent(status)}
                {/* {Object.values(status)[0].map(caseDetails => {
                  return (
                    <BookingDetails
                      caseDetails={caseDetails}
                      onPress={() =>
                        this.props.navigation.navigate("Case", {
                          caseDetails
                        })
                      }
                    />
                  );
                })} */}
              </View>
            );
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default withNavigation(ActiveCases);
