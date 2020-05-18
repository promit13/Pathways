import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import colors from "../style";
import CaseDetails from "../components/CaseDetails";
import SearchBarWrapper from "../components/SearchBar";
import LoadScreen from "../components/LoadScreen";
import OfflineNotice from "../components/OfflineNotice";

class ActiveCases extends React.Component {
  static navigationOptions = {
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
    myId: "",
    completedRecords: []
  };

  componentDidMount = async () => {
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    const { AccountId, Id } = jsonObjectData;
    const {
      casesArray,
      activeCaseCheck,
      arrayTitle
    } = this.props.navigation.state.params;
    console.log(casesArray);
    const sortedCasesArray = _.reverse(
      _.sortBy(casesArray, o => o.CreatedDate)
    );
    this.setState({
      activeCases: sortedCasesArray,
      activeCaseCheck,
      arrayTitle,
      loadScreen: false,
      accountId: AccountId,
      myId: Id
    });
  };

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
        <CaseDetails
          caseDetails={caseDetails}
          onPress={() => {
            if (!this.props.isConnected.isConnected) {
              return Alert.alert("No internet connection");
            }
            this.props.navigation.navigate("Case", {
              caseDetails
            });
          }}
        />
      );
    });
    return casesList;
  };

  render() {
    const {
      activeCases,
      arrayTitle,
      sevenDays,
      thirtyDays,
      sixtyDays,
      ninetyDays,
      allDays,
      myReferrals,
      myConstabulary,
      nationalReferrals,
      loadScreen,
      accountId,
      searchKey,
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
      if (myReferrals) {
        return (
          item.Referral__r &&
          item.Referral__r.Referrer_Contact_Name__c === myId &&
          isBetween &&
          item.Referral__r.Name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }
      if (myConstabulary) {
        return (
          item.Referral__r &&
          item.Referral__r.Referrer_Organisation__c === accountId &&
          isBetween &&
          item.Referral__r.Name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }
      return (
        item.Referral__r &&
        isBetween &&
        item.Referral__r.Name.toLowerCase().includes(searchKey.toLowerCase())
      );
    });
    filteredArray.push({ [arrayTitle]: searchFilteredArray });
    if (loadScreen) return <LoadScreen text="Please wait" />;
    console.log(filteredArray);
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? "" : "padding"}
        style={{
          flex: 1
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {!this.props.isConnected.isConnected && <OfflineNotice />}
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SearchBarWrapper
              showDownBar={true}
              onSearchChange={key => {
                this.setState({ searchKey: key });
              }}
              sevenDaysPress={() => {
                this.buttonPress(0);
              }}
              thirtyDaysPress={() => {
                this.buttonPress(1);
              }}
              sixtyDaysPress={() => {
                this.buttonPress(2);
              }}
              ninetyDaysPress={() => {
                this.buttonPress(3);
              }}
              allDaysPress={() => {
                this.buttonPress(4);
              }}
              myReferralsPress={() => {
                this.buttonPress(5);
              }}
              myConstabularyPress={() => {
                this.buttonPress(6);
              }}
              nationalReferralsPress={() => {
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
              const titleArray = Object.keys(status);
              console.log(titleArray);
              return (
                <View>
                  <View
                    style={{
                      backgroundColor: colors.darkGrey,
                      width: "100%",
                      borderTopWidth: 2,
                      borderTopColor: colors.grey,
                      paddingVertical: 10
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
                      {titleArray}
                    </Text>
                  </View>
                  {this.renderContent(status)}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
// export default withNavigation(ActiveCases);
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log("NETWORK STATUS", network);
  return {
    isConnected: network
  };
};

export default connect(mapStateToProps)(ActiveCases);
